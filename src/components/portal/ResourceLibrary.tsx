import React, { useState } from 'react';
import { BookOpen, Download, Play, FileText, Image, Video, Search, Filter } from 'lucide-react';

const ResourceLibrary: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const resources = [
    {
      id: '1',
      title: 'Complete Lice Identification Guide',
      type: 'pdf',
      category: 'guides',
      description: 'Visual guide to identifying lice vs. dandruff, nits vs. hair casts',
      size: '2.3 MB',
      downloads: 1247,
      featured: true
    },
    {
      id: '2',
      title: 'Treatment Step-by-Step Video',
      type: 'video',
      category: 'tutorials',
      description: 'Watch the complete treatment process from start to finish',
      duration: '12:34',
      downloads: 892,
      featured: true
    },
    {
      id: '3',
      title: 'Combing Technique Demonstration',
      type: 'video',
      category: 'tutorials',
      description: 'Proper metal comb technique for maximum effectiveness',
      duration: '8:15',
      downloads: 756,
      featured: false
    },
    {
      id: '4',
      title: 'School Notification Letter Template',
      type: 'pdf',
      category: 'templates',
      description: 'Professional template for notifying schools about lice treatment',
      size: '156 KB',
      downloads: 423,
      featured: false
    },
    {
      id: '5',
      title: 'Lice vs. Dandruff Comparison Photos',
      type: 'image',
      category: 'references',
      description: 'High-resolution photos showing the differences',
      size: '4.1 MB',
      downloads: 1089,
      featured: true
    },
    {
      id: '6',
      title: 'Product Shopping List',
      type: 'pdf',
      category: 'guides',
      description: 'Exact products to buy with brand recommendations and where to find them',
      size: '890 KB',
      downloads: 1456,
      featured: false
    },
    {
      id: '7',
      title: 'Family Screening Checklist',
      type: 'pdf',
      category: 'checklists',
      description: 'Printable checklist for screening all family members',
      size: '245 KB',
      downloads: 634,
      featured: false
    },
    {
      id: '8',
      title: 'Cleaning Priority Matrix',
      type: 'pdf',
      category: 'checklists',
      description: 'What to clean first, second, and what you can skip',
      size: '312 KB',
      downloads: 567,
      featured: false
    },
    {
      id: '9',
      title: 'Lice Lifecycle Explained',
      type: 'video',
      category: 'education',
      description: 'Understanding the 21-day cycle and why timing matters',
      duration: '6:42',
      downloads: 445,
      featured: false
    },
    {
      id: '10',
      title: 'Myth vs. Reality Fact Sheet',
      type: 'pdf',
      category: 'education',
      description: 'Debunking common lice myths with scientific facts',
      size: '1.2 MB',
      downloads: 789,
      featured: false
    },
    {
      id: '11',
      title: 'Emergency Contact Information',
      type: 'pdf',
      category: 'references',
      description: 'When to call healthcare providers and what to ask',
      size: '178 KB',
      downloads: 234,
      featured: false
    },
    {
      id: '12',
      title: 'Success Stories Collection',
      type: 'pdf',
      category: 'motivation',
      description: 'Real stories from parents who succeeded with this method',
      size: '2.8 MB',
      downloads: 678,
      featured: false
    }
  ];

  const categories = [
    { id: 'all', label: 'All Resources', count: resources.length },
    { id: 'guides', label: 'Guides', count: resources.filter(r => r.category === 'guides').length },
    { id: 'tutorials', label: 'Video Tutorials', count: resources.filter(r => r.category === 'tutorials').length },
    { id: 'checklists', label: 'Checklists', count: resources.filter(r => r.category === 'checklists').length },
    { id: 'templates', label: 'Templates', count: resources.filter(r => r.category === 'templates').length },
    { id: 'references', label: 'References', count: resources.filter(r => r.category === 'references').length },
    { id: 'education', label: 'Education', count: resources.filter(r => r.category === 'education').length },
    { id: 'motivation', label: 'Motivation', count: resources.filter(r => r.category === 'motivation').length },
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'pdf': return <FileText className="w-5 h-5 text-red-500" />;
      case 'video': return <Video className="w-5 h-5 text-blue-500" />;
      case 'image': return <Image className="w-5 h-5 text-green-500" />;
      default: return <FileText className="w-5 h-5 text-gray-500" />;
    }
  };

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredResources = resources.filter(r => r.featured);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 mb-8">
        <div className="flex items-center mb-4">
          <BookOpen className="w-8 h-8 text-yellow-600 mr-3" />
          <h1 className="text-3xl font-bold text-yellow-800">Resource Library</h1>
        </div>
        <p className="text-yellow-700 text-lg">
          Everything you need in one place. Guides, videos, checklists, and templates for lice treatment success.
        </p>
      </div>

      {/* Search and Filter */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search resources..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
            />
          </div>
          <div className="relative">
            <Filter className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 appearance-none bg-white min-w-48"
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.label} ({category.count})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Featured Resources */}
      {selectedCategory === 'all' && !searchTerm && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredResources.map((resource) => (
              <div key={resource.id} className="bg-gradient-to-br from-yellow-50 to-yellow-100 border border-yellow-200 rounded-xl p-6">
                <div className="flex items-center mb-4">
                  {getTypeIcon(resource.type)}
                  <span className="ml-2 text-sm font-medium text-gray-600 uppercase tracking-wide">
                    {resource.type}
                  </span>
                  <span className="ml-auto bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    Featured
                  </span>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{resource.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{resource.description}</p>
                <div className="flex items-center justify-between">
                  <div className="text-xs text-gray-500">
                    {resource.type === 'video' ? resource.duration : resource.size} • {resource.downloads} downloads
                  </div>
                  <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center">
                    <Download className="w-4 h-4 mr-2" />
                    {resource.type === 'video' ? 'Watch' : 'Download'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* All Resources */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {selectedCategory === 'all' ? 'All Resources' : categories.find(c => c.id === selectedCategory)?.label}
          </h2>
          <span className="text-gray-600">{filteredResources.length} resources found</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map((resource) => (
            <div key={resource.id} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-4">
                {getTypeIcon(resource.type)}
                <span className="ml-2 text-sm font-medium text-gray-600 uppercase tracking-wide">
                  {resource.type}
                </span>
                {resource.featured && (
                  <span className="ml-auto bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    Featured
                  </span>
                )}
              </div>
              
              <h3 className="font-bold text-gray-900 mb-2">{resource.title}</h3>
              <p className="text-gray-600 text-sm mb-4">{resource.description}</p>
              
              <div className="flex items-center justify-between">
                <div className="text-xs text-gray-500">
                  {resource.type === 'video' ? resource.duration : resource.size} • {resource.downloads} downloads
                </div>
                <button className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center">
                  {resource.type === 'video' ? (
                    <>
                      <Play className="w-4 h-4 mr-2" />
                      Watch
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Access Tools */}
      <div className="mt-8 bg-white border border-gray-200 rounded-xl p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Access Tools</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
            <FileText className="w-6 h-6 text-red-500 mb-2" />
            <div className="font-medium text-gray-900">Emergency Guide</div>
            <div className="text-sm text-gray-600">Quick reference for panic moments</div>
          </button>
          
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
            <Video className="w-6 h-6 text-blue-500 mb-2" />
            <div className="font-medium text-gray-900">Treatment Video</div>
            <div className="text-sm text-gray-600">Step-by-step visual guide</div>
          </button>
          
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
            <Image className="w-6 h-6 text-green-500 mb-2" />
            <div className="font-medium text-gray-900">ID Photos</div>
            <div className="text-sm text-gray-600">Lice vs. dandruff comparison</div>
          </button>
          
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
            <FileText className="w-6 h-6 text-purple-500 mb-2" />
            <div className="font-medium text-gray-900">Shopping List</div>
            <div className="text-sm text-gray-600">Exact products to buy</div>
          </button>
        </div>
      </div>

      {/* Help Section */}
      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
        <h3 className="text-lg font-bold text-blue-800 mb-4">Need Help Finding Something?</h3>
        <p className="text-blue-700 mb-4">
          Can't find what you're looking for? Our support team can help you locate the right resource or create custom materials for your situation.
        </p>
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-colors">
          Contact Support
        </button>
      </div>
    </div>
  );
};

export default ResourceLibrary;