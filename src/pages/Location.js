import React, { useState, useEffect } from 'react';
import { MapPin, Search, Star, Navigation, Clock, Phone, ChevronRight } from 'lucide-react';

export default function PharmacyFinder() {
  const [searchTerm, setSearchTerm] = useState('');
  const [userLocation, setUserLocation] = useState(null);
  const [selectedPharmacy, setSelectedPharmacy] = useState(null);

  // Mock pharmacy data
  const pharmacies = [
    {
      id: 1,
      name: "HealthPlus Pharmacy",
      address: "123 Main Street, Downtown",
      distance: "0.2 mi",
      rating: 4.8,
      reviews: 234,
      isOpen: true,
      hours: "Open until 10:00 PM",
      phone: "+1 (555) 123-4567",
      type: "Pharmacy",
      image: "/api/placeholder/100/80",
      coordinates: { lat: 40.7128, lng: -74.0060 }
    },
    {
      id: 2,
      name: "MediCare Express",
      address: "456 Oak Avenue, Midtown",
      distance: "0.4 mi",
      rating: 4.6,
      reviews: 189,
      isOpen: true,
      hours: "Open until 9:00 PM",
      phone: "+1 (555) 234-5678",
      type: "Pharmacy",
      image: "/api/placeholder/100/80",
      coordinates: { lat: 40.7589, lng: -73.9851 }
    },
    {
      id: 3,
      name: "QuickMeds Pharmacy",
      address: "789 Pine Road, Uptown",
      distance: "0.6 mi",
      rating: 4.7,
      reviews: 156,
      isOpen: false,
      hours: "Opens at 8:00 AM",
      phone: "+1 (555) 345-6789",
      type: "Pharmacy",
      image: "/api/placeholder/100/80",
      coordinates: { lat: 40.7831, lng: -73.9712 }
    },
    {
      id: 4,
      name: "City Drug Store",
      address: "321 Elm Street, Central",
      distance: "0.8 mi",
      rating: 4.5,
      reviews: 98,
      isOpen: true,
      hours: "Open until 8:00 PM",
      phone: "+1 (555) 456-7890",
      type: "Pharmacy",
      image: "/api/placeholder/100/80",
      coordinates: { lat: 40.7505, lng: -73.9934 }
    }
  ];

  const handleUseLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.error('Error getting location:', error);
          alert('Unable to get your location. Please check your browser settings.');
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  const MapPlaceholder = () => (
    <div className="relative w-full h-full bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl overflow-hidden">
      {/* Mock map background */}
      <div className="absolute inset-0 opacity-20">
        <svg className="w-full h-full" viewBox="0 0 400 300" fill="none">
          <path d="M0 100 Q100 50 200 100 T400 100 L400 300 L0 300 Z" fill="#e0e7ff" />
          <path d="M0 150 Q150 100 300 150 T400 150 L400 300 L0 300 Z" fill="#c7d2fe" />
        </svg>
      </div>
      
      {/* Street grid */}
      <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 400 300">
        <defs>
          <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
            <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#94a3b8" strokeWidth="1"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      {/* Pharmacy markers */}
      {pharmacies.map((pharmacy, index) => (
        <div
          key={pharmacy.id}
          className={`absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 transition-all duration-200 hover:scale-110 ${
            selectedPharmacy?.id === pharmacy.id ? 'scale-110 z-20' : 'z-10'
          }`}
          style={{
            left: `${25 + (index * 15)}%`,
            top: `${40 + (index * 10)}%`,
          }}
          onClick={() => setSelectedPharmacy(pharmacy)}
        >
          <div className={`w-8 h-8 rounded-full border-2 border-white shadow-lg flex items-center justify-center ${
            pharmacy.isOpen ? 'bg-green-500' : 'bg-red-500'
          }`}>
            <MapPin className="w-4 h-4 text-white" />
          </div>
          {selectedPharmacy?.id === pharmacy.id && (
            <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-lg p-2 min-w-32 text-center">
              <p className="text-xs font-medium text-gray-800">{pharmacy.name}</p>
              <p className="text-xs text-gray-600">{pharmacy.distance}</p>
            </div>
          )}
        </div>
      ))}

      {/* User location marker */}
      {userLocation && (
        <div
          className="absolute transform -translate-x-1/2 -translate-y-1/2 z-30"
          style={{ left: '50%', top: '50%' }}
        >
          <div className="w-4 h-4 bg-blue-600 rounded-full border-2 border-white shadow-lg animate-pulse"></div>
          <div className="absolute inset-0 w-4 h-4 bg-blue-600 rounded-full animate-ping opacity-20"></div>
        </div>
      )}

      <div className="absolute inset-0 flex items-center justify-center">
        <p className="text-gray-500 text-lg font-medium">Interactive Map</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 py-4 sm:py-6">
          <h1 className="text-xl sm:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">Find Nearby Pharmacies</h1>
          <p className="text-sm sm:text-base text-gray-600">Discover pharmacies near you with real-time availability</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 py-4 sm:py-8">
        {/* Search Bar */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-3 sm:p-6 mb-4 sm:mb-8">
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
              <input
                type="text"
                placeholder="Search for hospitals, pharmacies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-4 border border-gray-300 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base text-gray-700 placeholder-gray-400"
              />
            </div>
            <button
              onClick={handleUseLocation}
              className="flex items-center justify-center px-4 sm:px-6 py-3 sm:py-4 bg-[#33444E] text-white rounded-lg sm:rounded-xl hover:bg-[#2a3740] transition-colors duration-200 font-medium text-sm sm:text-base"
            >
              <Navigation className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              <span className="hidden xs:inline">Use My Location</span>
              <span className="xs:hidden">Location</span>
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-8">
          {/* Map */}
          <div className="lg:col-span-2 order-2 lg:order-1">
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-3 sm:p-6 h-[300px] sm:h-[400px] lg:h-[600px]">
              <MapPlaceholder />
            </div>
          </div>

          {/* Sidebar - Nearby Services */}
          <div className="space-y-4 sm:space-y-6 order-1 lg:order-2">
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-3 sm:p-6">
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <h2 className="text-lg sm:text-xl font-bold text-gray-900">Nearby Services</h2>
                <span className="text-xs sm:text-sm text-gray-500">Closest results</span>
              </div>

              <div className="space-y-3 sm:space-y-4 max-h-[400px] lg:max-h-none overflow-y-auto lg:overflow-visible">
                {pharmacies.map((pharmacy) => (
                  <div
                    key={pharmacy.id}
                    className={`p-3 sm:p-4 rounded-lg sm:rounded-xl border-2 transition-all duration-200 cursor-pointer hover:shadow-md ${
                      selectedPharmacy?.id === pharmacy.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedPharmacy(pharmacy)}
                  >
                    <div className="flex items-start space-x-3 sm:space-x-4">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-100 to-indigo-200 rounded-lg flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-1">
                          <h3 className="text-sm sm:text-lg font-semibold text-gray-900 truncate pr-2">
                            {pharmacy.name}
                          </h3>
                          <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full flex-shrink-0">
                            {pharmacy.type}
                          </span>
                        </div>
                        
                        <p className="text-xs sm:text-sm text-gray-600 mb-2 line-clamp-2">{pharmacy.address}</p>
                        
                        <div className="flex flex-col xs:flex-row xs:items-center xs:space-x-4 space-y-1 xs:space-y-0 mb-2 sm:mb-3">
                          <div className="flex items-center">
                            <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 mr-1" />
                            <span className="text-xs sm:text-sm font-medium text-gray-900">{pharmacy.distance}</span>
                          </div>
                          <div className="flex items-center">
                            <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 fill-current mr-1" />
                            <span className="text-xs sm:text-sm font-medium text-gray-900">{pharmacy.rating}</span>
                            <span className="text-xs sm:text-sm text-gray-500 ml-1">({pharmacy.reviews})</span>
                          </div>
                        </div>

                        <div className="flex flex-col xs:flex-row xs:items-center xs:justify-between space-y-2 xs:space-y-0">
                          <div className="flex items-center space-x-2">
                            <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 flex-shrink-0" />
                            <span className={`text-xs sm:text-sm font-medium truncate ${
                              pharmacy.isOpen ? 'text-green-600' : 'text-red-600'
                            }`}>
                              {pharmacy.hours}
                            </span>
                          </div>
                          <button className="flex items-center text-blue-600 hover:text-blue-700 text-xs sm:text-sm font-medium self-start xs:self-auto">
                            <span className="hidden sm:inline">View Details</span>
                            <span className="sm:hidden">Details</span>
                            <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 ml-1" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-3 sm:p-6 lg:block hidden">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full flex items-center justify-between p-3 text-left hover:bg-gray-50 rounded-lg transition-colors duration-200">
                  <span className="text-gray-700 text-sm sm:text-base">Find 24/7 Pharmacies</span>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </button>
                <button className="w-full flex items-center justify-between p-3 text-left hover:bg-gray-50 rounded-lg transition-colors duration-200">
                  <span className="text-gray-700 text-sm sm:text-base">Emergency Services</span>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </button>
                <button className="w-full flex items-center justify-between p-3 text-left hover:bg-gray-50 rounded-lg transition-colors duration-200">
                  <span className="text-gray-700 text-sm sm:text-base">Prescription Refill</span>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Quick Actions */}
        <div className="lg:hidden mt-4 bg-white rounded-xl shadow-lg p-3">
          <h3 className="text-base font-bold text-gray-900 mb-3">Quick Actions</h3>
          <div className="grid grid-cols-1 xs:grid-cols-3 gap-2">
            <button className="flex flex-col items-center justify-center p-3 text-center hover:bg-gray-50 rounded-lg transition-colors duration-200">
              <span className="text-gray-700 text-xs font-medium">24/7 Pharmacies</span>
            </button>
            <button className="flex flex-col items-center justify-center p-3 text-center hover:bg-gray-50 rounded-lg transition-colors duration-200">
              <span className="text-gray-700 text-xs font-medium">Emergency</span>
            </button>
            <button className="flex flex-col items-center justify-center p-3 text-center hover:bg-gray-50 rounded-lg transition-colors duration-200">
              <span className="text-gray-700 text-xs font-medium">Refill</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}