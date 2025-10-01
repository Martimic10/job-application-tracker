'use client'

import { createClient } from '@/lib/supabase'

interface Job {
  id: number
  company_name: string
  job_title: string
  date_applied: string
  status: string
  url: string | null
  notes: string | null
}

interface JobListProps {
  jobs: Job[]
  onJobsChanged: () => void
}

export default function JobList({ jobs, onJobsChanged }: JobListProps) {
  const handleStatusChange = async (jobId: number, newStatus: string) => {
    const supabase = createClient()
    await supabase
      .from('jobs')
      .update({ status: newStatus })
      .eq('id', jobId)
    
    onJobsChanged()
  }

  const handleDelete = async (jobId: number) => {
    if (!confirm('Are you sure you want to delete this application?')) {
      return
    }

    const supabase = createClient()
    await supabase.from('jobs').delete().eq('id', jobId)
    onJobsChanged()
  }

  if (jobs.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-12 text-center">
        <p className="text-gray-500 text-lg">No applications yet</p>
        <p className="text-gray-400 text-sm mt-2">
          Add your first job application to get started
        </p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Company
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Job Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Date Applied
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {jobs.map((job) => (
              <tr key={job.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {job.company_name}
                  </div>
                  {job.url && (
                    <a
                      href={job.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-blue-600 hover:text-blue-800"
                    >
                      View posting
                    </a>
                  )}
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900">{job.job_title}</div>
                  {job.notes && (
                    <div className="text-xs text-gray-500 mt-1">
                      {job.notes.substring(0, 50)}
                      {job.notes.length > 50 ? '...' : ''}
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {new Date(job.date_applied).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <select
                    value={job.status}
                    onChange={(e) => handleStatusChange(job.id, e.target.value)}
                    className="text-sm border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                  >
                    <option value="Applied">Applied</option>
                    <option value="Interview">Interview</option>
                    <option value="Offer">Offer</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <button
                    onClick={() => handleDelete(job.id)}
                    className="text-red-600 hover:text-red-800 font-medium"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
