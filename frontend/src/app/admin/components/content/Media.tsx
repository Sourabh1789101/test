import { useState } from "react";
import { Upload, Folder, Image, Trash2, Download, Search, Grid3x3, List } from "lucide-react";

const mediaFiles = [
  { id: 1, name: "product-hero.jpg", type: "image", size: "2.4 MB", folder: "Products", uploaded: "Feb 7, 2026", url: "🖼️" },
  { id: 2, name: "banner-summer.png", type: "image", size: "1.8 MB", folder: "Banners", uploaded: "Feb 6, 2026", url: "🖼️" },
  { id: 3, name: "logo.svg", type: "image", size: "45 KB", folder: "Brand", uploaded: "Feb 5, 2026", url: "🖼️" },
  { id: 4, name: "category-electronics.jpg", type: "image", size: "3.1 MB", folder: "Categories", uploaded: "Feb 4, 2026", url: "🖼️" },
  { id: 5, name: "testimonial-bg.jpg", type: "image", size: "1.2 MB", folder: "Content", uploaded: "Feb 3, 2026", url: "🖼️" },
  { id: 6, name: "product-01.jpg", type: "image", size: "890 KB", folder: "Products", uploaded: "Feb 2, 2026", url: "🖼️" },
];

const folders = ["All Files", "Products", "Banners", "Categories", "Brand", "Content"];

export function Media() {
  const [selectedFolder, setSelectedFolder] = useState("All Files");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredMedia = mediaFiles.filter(file => {
    const matchesFolder = selectedFolder === "All Files" || file.folder === selectedFolder;
    const matchesSearch = file.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFolder && matchesSearch;
  });

  return (
    <div className="flex h-full">
      <div className="flex-1 p-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Media Library</h2>
            <p className="text-gray-600 mt-1">{filteredMedia.length} files</p>
          </div>
          <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            <Upload className="w-4 h-4" />
            Upload Files
          </button>
        </div>

        {/* Folders */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {folders.map((folder) => (
            <button
              key={folder}
              onClick={() => setSelectedFolder(folder)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                selectedFolder === folder
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
              }`}
            >
              <Folder className="w-4 h-4" />
              {folder}
            </button>
          ))}
        </div>

        {/* Toolbar */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex-1 relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search files..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex gap-2 ml-4">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-lg ${viewMode === "grid" ? "bg-blue-100 text-blue-600" : "hover:bg-gray-100"}`}
              >
                <Grid3x3 className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-lg ${viewMode === "list" ? "bg-blue-100 text-blue-600" : "hover:bg-gray-100"}`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Grid View */}
        {viewMode === "grid" && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredMedia.map((file) => (
              <div key={file.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow group">
                <div className="aspect-square bg-gray-100 flex items-center justify-center text-6xl">
                  {file.url}
                </div>
                <div className="p-3">
                  <p className="font-medium text-gray-900 text-sm truncate">{file.name}</p>
                  <p className="text-xs text-gray-500 mt-1">{file.size}</p>
                  <div className="flex gap-2 mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="flex-1 p-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700">
                      <Download className="w-3 h-3 mx-auto" />
                    </button>
                    <button className="flex-1 p-1 text-xs bg-red-600 text-white rounded hover:bg-red-700">
                      <Trash2 className="w-3 h-3 mx-auto" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* List View */}
        {viewMode === "list" && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Preview</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Name</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Folder</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Size</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Uploaded</th>
                  <th className="px-6 py-4 text-right text-sm font-medium text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredMedia.map((file) => (
                  <tr key={file.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center text-2xl">
                        {file.url}
                      </div>
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900">{file.name}</td>
                    <td className="px-6 py-4 text-gray-600">{file.folder}</td>
                    <td className="px-6 py-4 text-gray-600">{file.size}</td>
                    <td className="px-6 py-4 text-gray-600 text-sm">{file.uploaded}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                          <Download className="w-4 h-4 text-gray-600" />
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
        )}

        {/* Upload Area */}
        <div className="mt-6 bg-white rounded-lg shadow-sm border-2 border-dashed border-gray-300 p-12 text-center">
          <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Upload Files</h3>
          <p className="text-gray-600 mb-4">Drag and drop files here, or click to browse</p>
          <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Select Files
          </button>
        </div>
      </div>

      {/* Right Rail */}
      <aside className="w-80 bg-white border-l border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Storage & Settings</h3>
        
        <div className="space-y-4">
          <div className="p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-900 font-medium mb-2">Storage Used</p>
            <p className="text-2xl font-bold text-blue-900 mb-2">8.4 GB</p>
            <div className="w-full bg-blue-200 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full" style={{ width: "42%" }}></div>
            </div>
            <p className="text-xs text-blue-800 mt-2">42% of 20 GB</p>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-700 font-medium mb-2">Total Files</p>
            <p className="text-2xl font-bold text-gray-900">1,234</p>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <h4 className="font-medium text-gray-900 mb-3">Media Settings</h4>
          
          <div className="space-y-4">
            <div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 text-blue-600 border-gray-300 rounded" defaultChecked />
                <span className="text-sm text-gray-700">Auto-optimize images</span>
              </label>
            </div>

            <div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 text-blue-600 border-gray-300 rounded" />
                <span className="text-sm text-gray-700">Use CDN</span>
              </label>
            </div>

            <div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 text-blue-600 border-gray-300 rounded" />
                <span className="text-sm text-gray-700">Remote storage (S3)</span>
              </label>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <h4 className="font-medium text-gray-900 mb-3">Allowed Formats</h4>
          <div className="flex flex-wrap gap-2">
            {["JPG", "PNG", "GIF", "SVG", "WebP"].map(format => (
              <span key={format} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                {format}
              </span>
            ))}
          </div>
        </div>
      </aside>
    </div>
  );
}
