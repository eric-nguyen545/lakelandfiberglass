"use client"

import React, { useState, useEffect } from 'react';
import { Search, X, ChevronLeft, ChevronRight, ExternalLink, Phone } from 'lucide-react';

// Sample data - in a real Next.js app, this would come from your CMS or API
const galleryData = [
  {
    id: 1,
    title: "Hull Repair - 32ft Cruiser",
    category: "hull-repair",
    beforeImage: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop",
    afterImage: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=800&h=600&fit=crop",
    description: "Complete hull restoration with gel coat refinishing",
    year: "2024"
  },
  {
    id: 2,
    title: "Deck Restoration - Yacht",
    category: "deck-work",
    beforeImage: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
    afterImage: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=800&h=600&fit=crop",
    description: "Non-slip deck coating and structural repairs",
    year: "2024"
  },
  {
    id: 3,
    title: "Transom Repair - Bass Boat",
    category: "transom-work",
    beforeImage: "https://images.unsplash.com/photo-1574157271095-a5b6e3c5f724?w=800&h=600&fit=crop",
    afterImage: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop",
    description: "Complete transom rebuild with fiberglass reinforcement",
    year: "2023"
  },
  {
    id: 4,
    title: "Gel Coat Restoration",
    category: "gel-coat",
    beforeImage: "https://images.unsplash.com/photo-1562067540-3a7f406accd7?w=800&h=600&fit=crop",
    afterImage: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
    description: "Full hull gel coat restoration and polish",
    year: "2024"
  },
  {
    id: 5,
    title: "Cabin Floor Repair",
    category: "interior",
    beforeImage: "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=800&h=600&fit=crop",
    afterImage: "https://images.unsplash.com/photo-1562067540-3a7f406accd7?w=800&h=600&fit=crop",
    description: "Structural floor repair with marine-grade materials",
    year: "2023"
  },
  {
    id: 6,
    title: "Pontoon Restoration",
    category: "pontoon",
    beforeImage: "https://images.unsplash.com/photo-1574157271095-a5b6e3c5f724?w=800&h=600&fit=crop",
    afterImage: "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=800&h=600&fit=crop",
    description: "Complete pontoon deck and railing restoration",
    year: "2024"
  }
];

const categories = [
  { id: 'all', name: 'All Projects', count: galleryData.length },
  { id: 'hull-repair', name: 'Hull Repair', count: galleryData.filter(item => item.category === 'hull-repair').length },
  { id: 'deck-work', name: 'Deck Work', count: galleryData.filter(item => item.category === 'deck-work').length },
  { id: 'transom-work', name: 'Transom Work', count: galleryData.filter(item => item.category === 'transom-work').length },
  { id: 'gel-coat', name: 'Gel Coat', count: galleryData.filter(item => item.category === 'gel-coat').length },
  { id: 'interior', name: 'Interior', count: galleryData.filter(item => item.category === 'interior').length },
  { id: 'pontoon', name: 'Pontoon', count: galleryData.filter(item => item.category === 'pontoon').length }
];

export default function LakelandGallery() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [showBefore, setShowBefore] = useState(true);
  const [filteredData, setFilteredData] = useState(galleryData);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading state
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let filtered = galleryData;
    
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }
    
    if (searchTerm) {
      filtered = filtered.filter(item => 
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredData(filtered);
  }, [selectedCategory, searchTerm]);

  const openLightbox = (item) => {
    setSelectedImage(item);
    setShowBefore(true);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    const currentIndex = filteredData.findIndex(item => item.id === selectedImage.id);
    const nextIndex = (currentIndex + 1) % filteredData.length;
    setSelectedImage(filteredData[nextIndex]);
    setShowBefore(true);
  };

  const prevImage = () => {
    const currentIndex = filteredData.findIndex(item => item.id === selectedImage.id);
    const prevIndex = (currentIndex - 1 + filteredData.length) % filteredData.length;
    setSelectedImage(filteredData[prevIndex]);
    setShowBefore(true);
  };

  const SkeletonCard = () => (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden animate-pulse">
      <div className="h-64 bg-gray-300"></div>
      <div className="p-4">
        <div className="h-4 bg-gray-300 rounded mb-2"></div>
        <div className="h-3 bg-gray-300 rounded w-2/3"></div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">LAKELAND FIBERGLASS</h1>
              <p className="text-lg text-blue-600 font-medium">Industry Leading Fiberglass Repair</p>
              <p className="text-gray-600">Servicing the Lake Minnetonka Area</p>
            </div>
            <div className="mt-4 md:mt-0 flex items-center space-x-4">
              <a href="tel:612-743-6765" className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                <Phone className="w-4 h-4 mr-2" />
                612-743-6765
              </a>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Gallery Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">PROJECT GALLERY</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our portfolio of professional fiberglass repairs and restorations. 
            Each project showcases our commitment to quality craftsmanship and attention to detail.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                }`}
              >
                {category.name} ({category.count})
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {isLoading ? (
            Array(6).fill(0).map((_, index) => <SkeletonCard key={index} />)
          ) : (
            filteredData.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer group"
                onClick={() => openLightbox(item)}
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={item.beforeImage}
                    alt={`${item.title} - Before`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity duration-300"></div>
                  <div className="absolute top-4 left-4">
                    <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Before/After
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600 mb-3">{item.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">{item.year}</span>
                    <button className="text-blue-600 hover:text-blue-800 font-medium text-sm flex items-center">
                      View Details
                      <ExternalLink className="w-4 h-4 ml-1" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {filteredData.length === 0 && !isLoading && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No projects found matching your criteria.</p>
          </div>
        )}

        {/* Social Media CTA */}
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Follow Our Daily Progress</h3>
          <p className="text-gray-600 mb-6">
            Stay updated with our latest projects and see our work in progress on social media.
          </p>
          <div className="flex justify-center space-x-4">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
              Follow on Facebook
            </button>
            <button className="bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-900 transition-colors">
              Follow on Instagram
            </button>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl w-full">
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
            >
              <X className="w-8 h-8" />
            </button>

            {/* Navigation Buttons */}
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 z-10"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 z-10"
            >
              <ChevronRight className="w-8 h-8" />
            </button>

            {/* Image Container */}
            <div className="bg-white rounded-lg overflow-hidden">
              <div className="relative h-96 md:h-[500px]">
                <img
                  src={showBefore ? selectedImage.beforeImage : selectedImage.afterImage}
                  alt={`${selectedImage.title} - ${showBefore ? 'Before' : 'After'}`}
                  className="w-full h-full object-cover"
                />
                
                {/* Before/After Toggle */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                  <div className="flex bg-black bg-opacity-50 rounded-lg p-1">
                    <button
                      onClick={() => setShowBefore(true)}
                      className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
                        showBefore ? 'bg-white text-black' : 'text-white hover:text-gray-300'
                      }`}
                    >
                      Before
                    </button>
                    <button
                      onClick={() => setShowBefore(false)}
                      className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
                        !showBefore ? 'bg-white text-black' : 'text-white hover:text-gray-300'
                      }`}
                    >
                      After
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Image Info */}
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{selectedImage.title}</h3>
                <p className="text-gray-600 mb-4">{selectedImage.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">Year: {selectedImage.year}</span>
                  <span className="text-blue-600 font-medium">
                    {showBefore ? 'Before Repair' : 'After Repair'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}