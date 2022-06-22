import axios from 'axios'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import JobPosting from '../classes/JobPosting'
import Filter from '../components/Filter'
import styles from '../styles/Home.module.css'
import JobCard from '../components/JobCard';
import SearchTitle from '../components/SearchTitle'
import searchBody from '../components/SearchBody'
import Link from 'next/link'

type JobData = {
  jobs: JobPosting[],
  subredditFilters: string[]
}

axios.defaults.baseURL = process.env.NEXT_PUBLIC_PROD_API_BASE_URL || "http://localhost:5000";

const Home: NextPage = () => {
  const [subredditFilters, setSubredditFilters] = useState<string[]>([]);
  const [jobData, setJobData] = useState<JobData | null>(null);
  const [filteredJobs, setFilteredJobs] = useState<JobPosting[] | null | any>(null);
  const [searchBodyFilter, setSearchBodyFilter] = useState<string>('');
  const [monthsSelected, setMonthsSelected] = useState<string[]>([]);

  function filterJobCards(): JobPosting[] | null{
    let jobsFilteredBySearchBody = filterBySearchBody(jobData?.jobs);
    if(jobsFilteredBySearchBody == null){
      return null;
    }

    let jobsFilteredByMonths = filterByMonths(jobsFilteredBySearchBody);

    if(jobsFilteredByMonths == null) {
      return null;
    }

    let jobsFilteredBySubreddit = filterBySubreddit(jobsFilteredByMonths);

    if(jobsFilteredBySubreddit == null) {
      return null;
    }

    return jobsFilteredBySubreddit;

  }

  function filterByMonths(jobs: JobPosting[]): JobPosting[] | null {
    if(monthsSelected.length === 0){
      return jobs;
    }

    const selectedMonthsAsSet = new Set(monthsSelected);
    let jobsFilteredByMonths = jobs.filter((job) => {
      return (selectedMonthsAsSet.has(job.monthYearPosted));
    });
    if(jobsFilteredByMonths.length === 0){
      return null;
    }
    return jobsFilteredByMonths;
  }

  function filterBySubreddit(jobs: JobPosting[]): JobPosting[] | null {
    if(subredditFilters.length === 0){
      return jobs;
    }
    const subredditFiltersAsSet = new Set(subredditFilters);
    let jobsFilteredBySubreddit = jobs.filter((job) => {
      return (subredditFiltersAsSet.has(job.fromSubreddit));
    });
    if(jobsFilteredBySubreddit.length === 0){
      return null;
    }
    return jobsFilteredBySubreddit;
  }



  function filterBySearchBody(jobs: JobPosting[] | undefined): JobPosting[] | null {
    if(jobs == undefined){
      return null;
    }
    if(searchBodyFilter.trim().length === 0 || searchBodyFilter.length <= 1){ // if the search body filter is just whitespace, don't filter for any jobs
      return jobs;
    }
    const searchBodyFilteredJobs = jobs.filter((job) => {
      let regex = new RegExp(searchBodyFilter);
      return regex.test(job.jobPostingDetails.toLowerCase());
    });
    if(searchBodyFilteredJobs.length === 0){
      return null;
    }

    searchBodyFilteredJobs.forEach((filteredJob) => {
      let regex = new RegExp(searchBodyFilter, 'ig');
      let separator = searchBodyFilter;
      let jobBodySplit = filteredJob.jobPostingDetails.split(regex); // split the job postings body by regex pattern of the search body string



      searchBodyFilteredJobs.forEach((filteredJob) => {

        if(searchBodyFilter.length <= 1 || searchBodyFilter.trim().length === 0)
          return;
        const regex = new RegExp(searchBodyFilter, 'ig');
        filteredJob.highlightedJobPostingDetails = filteredJob.jobPostingDetails.replace(regex, '<span className="bg-yellow-500">$&</span>')
    });

    });

    return searchBodyFilteredJobs;

  }

  

  useEffect(() => {
    async function getJobData(){
      await axios('/allJobs').then((res) => {
        setJobData(res.data);
        setFilteredJobs(res.data.jobs);
      });
    }

    getJobData();
   
    
  }, []);

  useEffect(() => {
    setFilteredJobs(filterJobCards());
  }, [searchBodyFilter, monthsSelected, subredditFilters]);
  if(jobData == null) {
    return (
      <div>
        <h1> Loading... </h1>
      </div>
    )
  } else {
  return (
    
    <div className="min-h-screen w-screen bg-slate-100 pt-10 flex flex-col">
      {/*grid has 5 columns, filters take up 1st column, rest of content takes up the other 4 columns */}
      <div className="px-20 py-8 flex flex-col items-center justify-center">
        {/* <a href="/" className="no-underline"> */}
        <Link href="/">
          <a className="no-underline">
        <h1 className="text-[#FF6962] text-4xl text-center font-semibold">ProggitJobs</h1>
        </a>
        </Link>
          {/* </a> */}
      </div>
        <Filter monthsSelected={monthsSelected} setMonthsSelected={setMonthsSelected} subredditFilters={jobData.subredditFilters} setSubredditFilters={setSubredditFilters} searchBody={searchBodyFilter} setSearchBody={setSearchBodyFilter}/>
      <div className="flex flex-col gap-y-2 mt-2">
      {filteredJobs?.map((job: JobPosting, index: number) => {
        if(job.highlightedJobPostingDetails == null){
          return <JobCard key={Math.random()} job={job} jobBody={job.jobPostingDetails}/>
        }
        
        return <JobCard key={Math.random()} job={job} jobBody={job.highlightedJobPostingDetails}/>
      })}
    </div>


    </div>


    
  )
    }
}


export default Home
