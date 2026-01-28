import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query"; // Assuming you use react-query
import {
  Mail,
  Phone,
  MapPin,
  BookOpen,
  School,
  Calendar,
  Search,
  Filter,
  Loader2,
  MoreVertical,
} from "lucide-react";
import { useLeads } from "../../hooks/useApply";
import { useColleges } from "../../hooks/useCollege";
import { useCourses } from "../../hooks/useCourse";

function Leads() {
  const [searchTerm, setSearchTerm] = useState("");
  const { data: leads, isLoading } = useLeads();
  const { data: coursesData } = useCourses();
  const { data: collegesData } = useColleges();
  const filteredLeads = leads?.data?.filter(
    (lead) =>
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.phone.includes(searchTerm),
  );

  const courseMap = {};
  coursesData?.data?.forEach((c) => {
    courseMap[c.id] = c.name;
  });

  const collegeMap = {};
  collegesData?.data?.forEach((c) => {
    collegeMap[c.id] = c.name;
  });

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-black text-[#1a237e]">Student Leads</h1>
          <p className="text-sm text-gray-500 font-medium">
            Manage and track all incoming enquiries
          </p>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search leads..."
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#6739b7] transition-all text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="p-2.5 bg-white border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 transition-all shadow-sm">
            <Filter size={20} />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-[1.5rem] shadow-sm border border-gray-100 overflow-hidden">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center p-20 gap-3">
            <Loader2 className="animate-spin text-[#6739b7]" size={32} />
            <span className="text-gray-400 font-medium">
              Fetching enquiries...
            </span>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-50/50 border-b border-gray-100">
                <tr>
                  <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                    Student Details
                  </th>
                  <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                    Enquiry For
                  </th>
                  <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider text-center">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredLeads?.map((lead) => (
                  <tr
                    key={lead.id}
                    className="hover:bg-gray-50/50 transition-colors group"
                  >
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-bold text-gray-800 text-sm">
                          {lead.name}
                        </span>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="flex items-center gap-1 text-[12px] text-gray-500">
                            <Phone size={12} /> {lead.phone}
                          </span>
                          <span className="flex items-center gap-1 text-[12px] text-gray-500">
                            <Mail size={12} /> {lead.email}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1">
                        <span className="flex items-center gap-1.5 text-xs font-bold text-[#6739b7]">
                          <BookOpen size={14} /> {courseMap[lead.course] || "Not Specified"}
                        </span>
                        <span className="flex items-center gap-1.5 text-xs text-gray-600">
                          <School size={14} /> {collegeMap[lead.college] || "Not Specified"}

                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5 text-xs text-gray-600 font-medium">
                        <MapPin size={14} className="text-gray-400" />
                        {lead.city}, {lead.state}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5 text-xs text-gray-400">
                        <Calendar size={14} />
                        {new Date(lead.createdAt).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button className="p-2 text-gray-400 hover:text-[#6739b7] hover:bg-indigo-50 rounded-lg transition-colors">
                        <MoreVertical size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {leads?.data?.length === 0 && (
              <div className="p-20 text-center text-gray-400">
                No leads found.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Leads;
