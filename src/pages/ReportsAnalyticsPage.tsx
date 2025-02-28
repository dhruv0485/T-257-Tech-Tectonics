import React, { useState } from 'react';
import { BarChart3, PieChart, TrendingUp, AlertTriangle, Download, Filter, Calendar, Eye, FileText } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const ReportsAnalyticsPage = () => {
  const [activeTab, setActiveTab] = useState<'usage' | 'anomalies'>('usage');
  const [selectedReport, setSelectedReport] = useState<string | null>(null);
  const [timeframe, setTimeframe] = useState<string>('last3months');

  // Sample data for usage reports
  const usageReports = [
    {
      id: 'REP-2025-001',
      title: 'Sunshine Orphanage - Q2 2025',
      date: 'June 30, 2025',
      donationType: 'Money',
      amount: '$250',
      impact: [
        'Provided educational supplies for 25 children',
        'Funded 3 teacher salaries for one month',
        'Supported facility maintenance and utilities'
      ],
      breakdown: {
        education: 45,
        nutrition: 20,
        healthcare: 15,
        infrastructure: 20
      }
    },
    {
      id: 'REP-2025-002',
      title: 'Nourish Food Bank - May 2025',
      date: 'May 31, 2025',
      donationType: 'Food',
      amount: '100 kg of rice',
      impact: [
        'Provided meals for 50 families (approximately 200 people)',
        'Supported weekly food distribution program',
        'Contributed to emergency food reserves'
      ],
      breakdown: {
        distribution: 70,
        storage: 15,
        transport: 10,
        administration: 5
      }
    },
    {
      id: 'REP-2025-003',
      title: 'Healing Hands Medical Clinic - Q2 2025',
      date: 'June 15, 2025',
      donationType: 'Medical Supplies',
      amount: 'First aid kits and medicines',
      impact: [
        'Treated approximately 120 patients',
        'Supported vaccination program for 45 children',
        'Provided emergency medical care for 15 critical cases'
      ],
      breakdown: {
        treatments: 55,
        preventiveCare: 25,
        emergencyCare: 15,
        staffTraining: 5
      }
    }
  ];

  // Sample data for anomaly detection
  const anomalies = [
    {
      id: 'ANO-2025-001',
      institution: 'Hope Community Center',
      date: 'June 5, 2025',
      severity: 'Medium',
      description: 'Unusual increase in administrative expenses (35% above normal)',
      status: 'Under Review',
      details: 'The institution reported higher than usual administrative costs. This may be due to annual staff training or system upgrades, but requires verification.'
    },
    {
      id: 'ANO-2025-002',
      institution: 'Golden Years Elderly Home',
      date: 'May 22, 2025',
      severity: 'Low',
      description: 'Delayed utilization report submission (15 days overdue)',
      status: 'Resolved',
      details: 'The institution was late in submitting their utilization report due to staff changes. The report has now been received and verified.'
    },
    {
      id: 'ANO-2025-003',
      institution: 'Bright Future Education Trust',
      date: 'June 12, 2025',
      severity: 'High',
      description: 'Significant discrepancy in reported beneficiary numbers',
      status: 'Investigating',
      details: 'There is a notable difference between the reported number of beneficiaries and the resources utilized. Our team is working with the institution to clarify this discrepancy.'
    }
  ];

  // Get severity color
  const getSeverityColor = (severity: string) => {
    switch(severity) {
      case 'Low':
        return 'bg-yellow-100 text-yellow-800';
      case 'Medium':
        return 'bg-orange-100 text-orange-800';
      case 'High':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Get status color
  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Resolved':
        return 'bg-green-100 text-green-800';
      case 'Under Review':
        return 'bg-blue-100 text-blue-800';
      case 'Investigating':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-900 to-indigo-800 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Reports & Analytics</h1>
              <p className="text-xl max-w-3xl mx-auto">
                Track the impact of your donations and ensure transparency in how your contributions are utilized.
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Tabs */}
          <div className="mb-8 border-b border-gray-200">
            <div className="flex space-x-8">
              <button
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'usage'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                onClick={() => setActiveTab('usage')}
              >
                <div className="flex items-center">
                  <BarChart3 className="h-5 w-5 mr-2" />
                  Donation Usage Reports
                </div>
              </button>
              <button
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'anomalies'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                onClick={() => setActiveTab('anomalies')}
              >
                <div className="flex items-center">
                  <AlertTriangle className="h-5 w-5 mr-2" />
                  Anomaly Detection
                </div>
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="mb-8 bg-white rounded-lg shadow-md p-4">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="flex items-center">
                <Filter className="h-5 w-5 text-gray-500 mr-2" />
                <span className="text-gray-700 mr-2">Timeframe:</span>
                <select
                  className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                  value={timeframe}
                  onChange={(e) => setTimeframe(e.target.value)}
                >
                  <option value="last3months">Last 3 Months</option>
                  <option value="last6months">Last 6 Months</option>
                  <option value="lastyear">Last Year</option>
                  <option value="alltime">All Time</option>
                </select>
              </div>
              <div className="flex items-center">
                <Calendar className="h-5 w-5 text-gray-500 mr-2" />
                <span className="text-gray-700 mr-2">Custom Range:</span>
                <input
                  type="date"
                  className="block w-full pl-3 pr-3 py-2 text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md mr-2"
                />
                <span className="text-gray-700 mx-2">to</span>
                <input
                  type="date"
                  className="block w-full pl-3 pr-3 py-2 text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                />
              </div>
            </div>
          </div>

          {/* Usage Reports Tab */}
          {activeTab === 'usage' && (
            <div>
              {selectedReport ? (
                // Detailed Report View
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <div className="p-6 border-b border-gray-200">
                    <button 
                      onClick={() => setSelectedReport(null)}
                      className="text-gray-600 hover:text-gray-900 font-medium flex items-center"
                    >
                      ← Back to all reports
                    </button>
                    <div className="mt-4 flex flex-col md:flex-row md:items-center md:justify-between">
                      <div>
                        <h2 className="text-2xl font-bold text-gray-800">{usageReports.find(r => r.id === selectedReport)?.title}</h2>
                        <p className="text-gray-600">{usageReports.find(r => r.id === selectedReport)?.date}</p>
                      </div>
                      <div className="mt-4 md:mt-0">
                        <button className="flex items-center text-gray-700 hover:text-gray-900 border border-gray-300 rounded-md px-3 py-1.5">
                          <Download className="h-4 w-4 mr-1" /> Download Report
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="text-sm font-medium text-gray-500 mb-1">Donation Type</h3>
                        <p className="text-lg font-semibold text-gray-800">{usageReports.find(r => r.id === selectedReport)?.donationType}</p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="text-sm font-medium text-gray-500 mb-1">Amount/Items</h3>
                        <p className="text-lg font-semibold text-gray-800">{usageReports.find(r => r.id === selectedReport)?.amount}</p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="text-sm font-medium text-gray-500 mb-1">Report ID</h3>
                        <p className="text-lg font-semibold text-gray-800">{selectedReport}</p>
                      </div>
                    </div>
                    
                    <div className="mb-8">
                      <h3 className="text-xl font-bold text-gray-800 mb-4">Impact Summary</h3>
                      <div className="bg-blue-50 rounded-lg p-4">
                        <ul className="space-y-2">
                          {usageReports.find(r => r.id === selectedReport)?.impact.map((item, index) => (
                            <li key={index} className="flex items-start">
                              <div className="flex-shrink-0 h-5 w-5 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold mt-0.5 mr-2">
                                {index + 1}
                              </div>
                              <span className="text-blue-800">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                    <div className="mb-8">
                      <h3 className="text-xl font-bold text-gray-800 mb-4">Utilization Breakdown</h3>
                      <div className="bg-white border border-gray-200 rounded-lg p-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <div>
                            {Object.entries(usageReports.find(r => r.id === selectedReport)?.breakdown || {}).map(([category, percentage], index) => (
                              <div key={index} className="mb-4">
                                <div className="flex justify-between mb-1">
                                  <span className="text-gray-700 capitalize">{category}</span>
                                  <span className="text-gray-700">{percentage}%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2.5">
                                  <div 
                                    className="bg-blue-600 h-2.5 rounded-full" 
                                    style={{ width: `${percentage}%` }}
                                  ></div>
                                </div>
                              </div>
                            ))}
                          </div>
                          <div className="flex items-center justify-center">
                            <div className="w-48 h-48 rounded-full border-8 border-blue-100 flex items-center justify-center">
                              <PieChart className="h-24 w-24 text-blue-500" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 mb-4">Verification & Compliance</h3>
                      <div className="bg-green-50 rounded-lg p-4">
                        <div className="flex items-center mb-2">
                          <div className="h-6 w-6 rounded-full bg-green-500 flex items-center justify-center mr-2">
                            <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <span className="text-green-800 font-medium">This report has been verified and complies with our transparency standards.</span>
                        </div>
                        <p className="text-green-700 text-sm">
                          All donations are tracked and verified by our team to ensure they are used as intended. This report has been reviewed by our compliance team.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                // Reports List View
                <div className="bg-white shadow-md rounded-lg overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-200">
                    <h2 className="text-xl font-bold text-gray-800">Your Donation Usage Reports</h2>
                  </div>
                  
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Report ID
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Title
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Date
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Type
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Amount
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {usageReports.map((report) => (
                          <tr 
                            key={report.id} 
                            className="hover:bg-gray-50 cursor-pointer"
                            onClick={() => setSelectedReport(report.id)}
                          >
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {report.id}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {report.title}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {report.date}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {report.donationType}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {report.amount}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              <div className="flex space-x-2">
                                <button 
                                  className="text-blue-600 hover:text-blue-800"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedReport(report.id);
                                  }}
                                >
                                  <Eye className="h-5 w-5" />
                                </button>
                                <button 
                                  className="text-gray-600 hover:text-gray-800"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <Download className="h-5 w-5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Anomaly Detection Tab */}
          {activeTab === 'anomalies' && (
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-800">Anomaly Detection</h2>
                <p className="text-gray-600 mt-1">
                  Our system monitors donation utilization patterns to ensure transparency and prevent misuse.
                </p>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        ID
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Institution
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Severity
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Description
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {anomalies.map((anomaly) => (
                      <tr 
                        key={anomaly.id} 
                        className="hover:bg-gray-50"
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {anomaly.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {anomaly.institution}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {anomaly.date}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getSeverityColor(anomaly.severity)}`}>
                            {anomaly.severity}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(anomaly.status)}`}>
                            {anomaly.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          <div className="max-w-xs">
                            <p className="truncate">{anomaly.description}</p>
                            <button className="text-blue-600 hover:text-blue-800 text-xs mt-1">
                              View Details
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="px-6 py-4 bg-gray-50">
                <div className="flex items-center">
                  <FileText className="h-5 w-5 text-gray-500 mr-2" />
                  <p className="text-gray-600 text-sm">
                    Our anomaly detection system helps ensure that all donations are used appropriately. Any unusual patterns are flagged for review.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Information Section */}
          <div className="mt-12 bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Understanding Our Reports</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="flex items-center mb-4">
                  <BarChart3 className="h-6 w-6 text-blue-600 mr-2" />
                  <h3 className="text-xl font-semibold text-gray-800">Usage Reports</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Our detailed usage reports provide transparency on how your donations are utilized, with specific impact metrics and breakdowns.
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <div className="h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xs font-bold mr-2 mt-0.5">✓</div>
                    <span>Detailed breakdown of fund allocation</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xs font-bold mr-2 mt-0.5">✓</div>
                    <span>Specific impact metrics and beneficiary information</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xs font-bold mr-2 mt-0.5">✓</div>
                    <span>Verified by our compliance team</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="flex items-center mb-4">
                  <AlertTriangle className="h-6 w-6 text-amber-600 mr-2" />
                  <h3 className="text-xl font-semibold text-gray-800">Anomaly Detection</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Our system continuously monitors donation utilization patterns to identify any unusual activities that might indicate misuse.
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <div className="h-5 w-5 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 text-xs font-bold mr-2 mt-0.5">✓</div>
                    <span>Automated monitoring of spending patterns</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-5 w-5 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 text-xs font-bold mr-2 mt-0.5">✓</div>
                    <span>Prompt investigation of unusual activities</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-5 w-5 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 text-xs font-bold mr-2 mt-0.5">✓</div>
                    <span>Transparent reporting of findings</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ReportsAnalyticsPage;