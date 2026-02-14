import { useState } from "react";
import { Plus, Edit, Trash2, Eye, Calendar, FileText } from "lucide-react";

const pagesData = [
  { id: 1, title: "Homepage Hero Banner", type: "Banner", status: "Published", updated: "Feb 5, 2026", scheduled: false },
  { id: 2, title: "About Us", type: "Page", status: "Published", updated: "Jan 20, 2026", scheduled: false },
  { id: 3, title: "Summer Sale Promotion", type: "Promotion", status: "Scheduled", updated: "Feb 7, 2026", scheduled: true, scheduledDate: "Jun 1, 2026" },
  { id: 4, title: "Shipping Policy", type: "Page", status: "Published", updated: "Dec 15, 2025", scheduled: false },
  { id: 5, title: "Holiday Banner 2026", type: "Banner", status: "Draft", updated: "Feb 1, 2026", scheduled: false },
];

export function ContentPages() {
  const [activeTab, setActiveTab] = useState("all");
  const [showEditor, setShowEditor] = useState(false);

  const filteredPages = pagesData.filter(page => {
    if (activeTab === "all") return true;
    if (activeTab === "banners") return page.type === "Banner";
    if (activeTab === "pages") return page.type === "Page";
    if (activeTab === "promotions") return page.type === "Promotion";
    return true;
  });

  return (
    <div className="flex h-full">
      <div className="flex-1 p-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Content & Pages</h2>
            <p className="text-gray-600 mt-1">Manage static pages, banners, and promotions</p>
          </div>
          <button 
            onClick={() => setShowEditor(true)}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Create Content
          </button>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <div className="flex gap-4">
            {[
              { id: "all", label: "All Content" },
              { id: "banners", label: "Banners" },
              { id: "pages", label: "Pages" },
              { id: "promotions", label: "Promotions" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-3 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-600 hover:text-gray-900"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Title</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Type</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Last Updated</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Scheduled</th>
                  <th className="px-6 py-4 text-right text-sm font-medium text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredPages.map((page) => (
                  <tr key={page.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-gray-400" />
                        <span className="font-medium text-gray-900">{page.title}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{page.type}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        page.status === 'Published' ? 'bg-green-100 text-green-700' :
                        page.status === 'Scheduled' ? 'bg-blue-100 text-blue-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {page.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-600 text-sm">{page.updated}</td>
                    <td className="px-6 py-4 text-gray-600 text-sm">
                      {page.scheduled ? (
                        <div className="flex items-center gap-1 text-blue-600">
                          <Calendar className="w-4 h-4" />
                          {page.scheduledDate}
                        </div>
                      ) : (
                        "-"
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                          <Eye className="w-4 h-4 text-gray-600" />
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                          <Edit className="w-4 h-4 text-gray-600" />
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* WYSIWYG Editor Modal */}
        {showEditor && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg w-full max-w-5xl mx-4 max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-xl font-bold text-gray-900">Content Editor</h3>
              </div>
              
              <div className="p-6 space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                  <input 
                    type="text" 
                    placeholder="Enter title..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Content Type</label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Banner</option>
                    <option>Page</option>
                    <option>Promotion</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
                  <div className="border border-gray-300 rounded-lg">
                    {/* Toolbar */}
                    <div className="border-b border-gray-300 p-2 flex gap-1 bg-gray-50">
                      <button className="px-3 py-1 hover:bg-gray-200 rounded text-sm font-bold">B</button>
                      <button className="px-3 py-1 hover:bg-gray-200 rounded text-sm italic">I</button>
                      <button className="px-3 py-1 hover:bg-gray-200 rounded text-sm underline">U</button>
                      <div className="w-px bg-gray-300 mx-1"></div>
                      <button className="px-3 py-1 hover:bg-gray-200 rounded text-sm">H1</button>
                      <button className="px-3 py-1 hover:bg-gray-200 rounded text-sm">H2</button>
                      <button className="px-3 py-1 hover:bg-gray-200 rounded text-sm">H3</button>
                      <div className="w-px bg-gray-300 mx-1"></div>
                      <button className="px-3 py-1 hover:bg-gray-200 rounded text-sm">Link</button>
                      <button className="px-3 py-1 hover:bg-gray-200 rounded text-sm">Image</button>
                    </div>
                    {/* Editor Area */}
                    <textarea 
                      rows={12}
                      placeholder="Write your content here..."
                      className="w-full px-4 py-3 focus:outline-none resize-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                    <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option>Draft</option>
                      <option>Published</option>
                      <option>Scheduled</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Publish Date (Optional)</label>
                    <input 
                      type="datetime-local"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Target Audience (Optional)</label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>All Visitors</option>
                    <option>Logged In Users</option>
                    <option>New Visitors</option>
                    <option>VIP Customers</option>
                  </select>
                </div>
              </div>

              <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
                <button 
                  onClick={() => setShowEditor(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700">
                  Save Draft
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Publish
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Right Rail */}
      <aside className="w-80 bg-white border-l border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Content Tips</h3>
        
        <div className="space-y-4 text-sm text-gray-600">
          <div className="p-4 bg-blue-50 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">Banners</h4>
            <p className="text-blue-800">Hero sections and promotional banners for homepage and category pages</p>
          </div>

          <div className="p-4 bg-green-50 rounded-lg">
            <h4 className="font-medium text-green-900 mb-2">Pages</h4>
            <p className="text-green-800">Static pages like About Us, Shipping Policy, Terms of Service</p>
          </div>

          <div className="p-4 bg-purple-50 rounded-lg">
            <h4 className="font-medium text-purple-900 mb-2">Promotions</h4>
            <p className="text-purple-800">Time-sensitive promotional content with scheduling support</p>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <h4 className="font-medium text-gray-900 mb-3">Best Practices</h4>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>• Use scheduling for seasonal content</li>
            <li>• Target specific audiences for better conversion</li>
            <li>• Keep content concise and scannable</li>
            <li>• Include clear calls-to-action</li>
          </ul>
        </div>
      </aside>
    </div>
  );
}
