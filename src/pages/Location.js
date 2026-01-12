import React, { useState, useEffect } from 'react';
import { MapPin, Search, Star, Navigation, Clock, Phone, ChevronRight, AlertTriangle, Shield, Pill, Activity, Loader } from 'lucide-react';

export default function LocationFinder() {
  const [searchTerm, setSearchTerm] = useState('');
  const [userLocation, setUserLocation] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [locationError, setLocationError] = useState(null);
  const [filter, setFilter] = useState('all'); // 'all', 'pharmacy', 'hospital', 'emergency'

  // Enhanced mock data with Zaria-based locations
  const mockPlaces = [
    {
      id: 1,
      name: "Ahmadu Bello University Teaching Hospital",
      address: "Samaru, Zaria, Kaduna State",
      distance: "0.5 km",
      rating: 4.8,
      reviews: 1450,
      isOpen: true,
      hours: "24/7 Emergency Services",
      phone: "+234 803 123 4567",
      type: "hospital",
      services: ["Emergency Care", "Surgery", "Laboratory", "Radiology", "ICU"],
      image: "/api/placeholder/100/80",
      coordinates: { lat: 11.1515, lng: 7.6885 },
      emergencyService: true
    },
    {
      id: 2,
      name: "HealthCare Plus Pharmacy",
      address: "Sabon Gari Market, Zaria, Kaduna State",
      distance: "0.3 km",
      rating: 4.7,
      reviews: 345,
      isOpen: true,
      hours: "Open until 10:00 PM",
      phone: "+234 803 234 5678",
      type: "pharmacy",
      services: ["Prescription Drugs", "Malaria Test Kits", "OTC Medicines", "Health Consultation"],
      image: "/api/placeholder/100/80",
      coordinates: { lat: 11.1100, lng: 7.7240 },
      emergencyService: false
    },
    {
      id: 3,
      name: "Zaria General Hospital",
      address: "Hospital Road, Zaria City, Kaduna State",
      distance: "0.8 km",
      rating: 4.5,
      reviews: 890,
      isOpen: true,
      hours: "24/7 Emergency Available",
      phone: "+234 803 345 6789",
      type: "hospital",
      services: ["General Medicine", "Pediatrics", "Emergency Care", "Maternity"],
      image: "/api/placeholder/100/80",
      coordinates: { lat: 11.1100, lng: 7.7100 },
      emergencyService: true
    },
    {
      id: 4,
      name: "QuickMeds Pharmacy Zaria",
      address: "Kaduna Road, Zaria, Kaduna State",
      distance: "1.2 km",
      rating: 4.6,
      reviews: 256,
      isOpen: true,
      hours: "Open until 9:00 PM",
      phone: "+234 803 456 7890",
      type: "pharmacy",
      services: ["Prescription Drugs", "Malaria Drugs", "First Aid Supplies", "Blood Pressure Monitoring"],
      image: "/api/placeholder/100/80",
      coordinates: { lat: 11.0870, lng: 7.7100 },
      emergencyService: false
    },
    {
      id: 5,
      name: "National Eye Centre Kaduna",
      address: "Mando Road, Kaduna (Near Zaria)",
      distance: "15.5 km",
      rating: 4.7,
      reviews: 1120,
      isOpen: true,
      hours: "Open 8:00 AM - 6:00 PM",
      phone: "+234 803 567 8901",
      type: "hospital",
      services: ["Eye Care", "Surgery", "Emergency Eye Care", "Consultation"],
      image: "/api/placeholder/100/80",
      coordinates: { lat: 10.5264, lng: 7.4379 },
      emergencyService: true
    },
    {
      id: 6,
      name: "City Pharmacy Zaria",
      address: "Samaru Market Area, Zaria, Kaduna State",
      distance: "0.7 km",
      rating: 4.4,
      reviews: 189,
      isOpen: false,
      hours: "Opens at 8:00 AM",
      phone: "+234 803 678 9012",
      type: "pharmacy",
      services: ["Prescription Drugs", "OTC Medicines", "Health Consultation"],
      image: "/api/placeholder/100/80",
      coordinates: { lat: 11.1450, lng: 7.6920 },
      emergencyService: false
    }
  ];

  const [places, setPlaces] = useState(mockPlaces);

  // Filter places based on selected filter
  const filteredPlaces = places.filter(place => {
    const matchesSearch = place.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         place.address.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' || place.type === filter || 
                         (filter === 'emergency' && place.emergencyService);
    return matchesSearch && matchesFilter;
  });

  const handleUseLocation = () => {
    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by this browser.');
      return;
    }

    setIsLoading(true);
    setLocationError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        setUserLocation(location);
        setIsLoading(false);
        
        // In a real app, you would call an API to get nearby places
        // For demo, we'll simulate updating distances
        const updatedPlaces = places.map(place => ({
          ...place,
          distance: `${(Math.random() * 5).toFixed(1)} km`
        }));
        setPlaces(updatedPlaces);
      },
      (error) => {
        setIsLoading(false);
        let errorMessage = 'Unable to get your location. ';
        switch(error.code) {
          case error.PERMISSION_DENIED:
            errorMessage += 'Please allow location access and try again.';
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage += 'Location information is unavailable.';
            break;
          case error.TIMEOUT:
            errorMessage += 'Location request timed out.';
            break;
          default:
            errorMessage += 'An unknown error occurred.';
            break;
        }
        setLocationError(errorMessage);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000 // 5 minutes
      }
    );
  };

  // Quick action handlers
  const handleEmergencyServices = () => {
    setFilter('emergency');
    setSearchTerm('');
    // Focus on emergency services
    const emergencyPlaces = places.filter(place => place.emergencyService);
    if (emergencyPlaces.length > 0) {
      setSelectedPlace(emergencyPlaces[0]);
    }
  };

  const handleFindPharmacies = () => {
    setFilter('pharmacy');
    setSearchTerm('');
  };

  const handleFind24Hours = () => {
    setFilter('all');
    setSearchTerm('24');
  };

  const handleCallPlace = (phone) => {
    window.location.href = `tel:${phone}`;
  };

  const handleDirections = (place) => {
    if (userLocation) {
      // Open in default maps app
      const url = `https://www.google.com/maps/dir/${userLocation.lat},${userLocation.lng}/${place.coordinates.lat},${place.coordinates.lng}`;
      window.open(url, '_blank');
    } else {
      // Just open the destination
      const url = `https://www.google.com/maps/search/${encodeURIComponent(place.address)}`;
      window.open(url, '_blank');
    }
  };

  const MapPlaceholder = () => (
    <div className="relative w-full h-full bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl overflow-hidden">
      {isLoading && (
        <div className="absolute inset-0 bg-white bg-opacity-80 flex items-center justify-center z-50">
          <div className="flex items-center space-x-2">
            <Loader className="w-5 h-5 animate-spin text-blue-600" />
            <span className="text-gray-600">Getting your location...</span>
          </div>
        </div>
      )}

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

      {/* Place markers */}
      {filteredPlaces.map((place, index) => (
        <div
          key={place.id}
          className={`absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 transition-all duration-200 hover:scale-110 ${
            selectedPlace?.id === place.id ? 'scale-110 z-20' : 'z-10'
          }`}
          style={{
            left: `${20 + (index * 15)}%`,
            top: `${30 + (index * 12)}%`,
          }}
          onClick={() => setSelectedPlace(place)}
        >
          <div className={`w-8 h-8 rounded-full border-2 border-white shadow-lg flex items-center justify-center ${
            place.type === 'hospital' ? 'bg-red-500' : 
            place.type === 'pharmacy' ? 'bg-green-500' : 
            'bg-blue-500'
          }`}>
            {place.type === 'hospital' ? (
              <Activity className="w-4 h-4 text-white" />
            ) : place.type === 'pharmacy' ? (
              <Pill className="w-4 h-4 text-white" />
            ) : (
              <MapPin className="w-4 h-4 text-white" />
            )}
          </div>
          {selectedPlace?.id === place.id && (
            <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-lg p-3 min-w-48 text-center border">
              <p className="text-sm font-medium text-gray-800 mb-1">{place.name}</p>
              <p className="text-xs text-gray-600 mb-2">{place.distance}</p>
              <div className="flex space-x-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCallPlace(place.phone);
                  }}
                  className="flex-1 px-2 py-1 bg-green-500 text-white text-xs rounded hover:bg-green-600 transition-colors"
                >
                  Call
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDirections(place);
                  }}
                  className="flex-1 px-2 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600 transition-colors"
                >
                  Directions
                </button>
              </div>
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
          <div className="absolute top-6 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-2 py-1 rounded text-xs font-medium whitespace-nowrap">
            You are here
          </div>
        </div>
      )}

      <div className="absolute inset-0 flex items-center justify-center">
        <p className="text-gray-500 text-lg font-medium">Interactive Map - Zaria, Kaduna State</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 py-4 sm:py-6">
          <h1 className="text-xl sm:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">Find Nearby Healthcare</h1>
          <p className="text-sm sm:text-base text-gray-600">Discover hospitals, pharmacies and emergency services near you</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 py-4 sm:py-8">
        {/* Search and Filters */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-3 sm:p-6 mb-4 sm:mb-8">
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
              <input
                type="text"
                placeholder="Search for hospitals, pharmacies, clinics..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-4 border border-gray-300 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base text-gray-700 placeholder-gray-400"
              />
            </div>
            <button
              onClick={handleUseLocation}
              disabled={isLoading}
              className="flex items-center justify-center px-4 sm:px-6 py-3 sm:py-4 bg-[#33444E] text-white rounded-lg sm:rounded-xl hover:bg-[#2a3740] transition-colors duration-200 font-medium text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <Loader className="w-4 h-4 sm:w-5 sm:h-5 animate-spin mr-2" />
              ) : (
                <Navigation className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              )}
              <span className="hidden xs:inline">
                {isLoading ? 'Locating...' : 'Use My Location'}
              </span>
              <span className="xs:hidden">
                {isLoading ? 'Getting...' : 'Location'}
              </span>
            </button>
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === 'all'
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter('hospital')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === 'hospital'
                  ? 'bg-red-100 text-red-800'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Hospitals
            </button>
            <button
              onClick={() => setFilter('pharmacy')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === 'pharmacy'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Pharmacies
            </button>
            <button
              onClick={() => setFilter('emergency')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === 'emergency'
                  ? 'bg-orange-100 text-orange-800'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Emergency
            </button>
          </div>

          {/* Location Error */}
          {locationError && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex">
                <AlertTriangle className="w-5 h-5 text-red-400 mr-2 mt-0.5" />
                <p className="text-sm text-red-700">{locationError}</p>
              </div>
            </div>
          )}
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
                <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                  Nearby Services ({filteredPlaces.length})
                </h2>
                <span className="text-xs sm:text-sm text-gray-500">Closest results</span>
              </div>

              <div className="space-y-3 sm:space-y-4 max-h-[400px] lg:max-h-none overflow-y-auto lg:overflow-visible">
                {filteredPlaces.length === 0 ? (
                  <div className="text-center py-8">
                    <MapPin className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">No services found matching your criteria</p>
                    <button
                      onClick={() => {
                        setFilter('all');
                        setSearchTerm('');
                      }}
                      className="mt-2 text-blue-600 text-sm hover:text-blue-700 font-medium"
                    >
                      Clear filters
                    </button>
                  </div>
                ) : (
                  filteredPlaces.map((place) => (
                    <div
                      key={place.id}
                      className={`p-3 sm:p-4 rounded-lg sm:rounded-xl border-2 transition-all duration-200 cursor-pointer hover:shadow-md ${
                        selectedPlace?.id === place.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setSelectedPlace(place)}
                    >
                      <div className="flex items-start space-x-3 sm:space-x-4">
                        <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-lg flex items-center justify-center flex-shrink-0 ${
                          place.type === 'hospital' ? 'bg-red-100' :
                          place.type === 'pharmacy' ? 'bg-green-100' :
                          'bg-blue-100'
                        }`}>
                          {place.type === 'hospital' ? (
                            <Activity className={`w-5 h-5 sm:w-6 sm:h-6 ${
                              place.type === 'hospital' ? 'text-red-600' : 'text-blue-600'
                            }`} />
                          ) : place.type === 'pharmacy' ? (
                            <Pill className={`w-5 h-5 sm:w-6 sm:h-6 ${
                              place.type === 'pharmacy' ? 'text-green-600' : 'text-blue-600'
                            }`} />
                          ) : (
                            <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                          )}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-1">
                            <h3 className="text-sm sm:text-lg font-semibold text-gray-900 truncate pr-2">
                              {place.name}
                            </h3>
                            <div className="flex flex-col space-y-1">
                              <span className={`text-xs font-medium px-2 py-1 rounded-full flex-shrink-0 ${
                                place.type === 'hospital' ? 'bg-red-100 text-red-800' :
                                place.type === 'pharmacy' ? 'bg-green-100 text-green-800' :
                                'bg-blue-100 text-blue-800'
                              }`}>
                                {place.type.charAt(0).toUpperCase() + place.type.slice(1)}
                              </span>
                              {place.emergencyService && (
                                <span className="text-xs font-medium px-2 py-1 rounded-full bg-orange-100 text-orange-800">
                                  Emergency
                                </span>
                              )}
                            </div>
                          </div>
                          
                          <p className="text-xs sm:text-sm text-gray-600 mb-2 line-clamp-2">{place.address}</p>
                          
                          <div className="flex flex-col xs:flex-row xs:items-center xs:space-x-4 space-y-1 xs:space-y-0 mb-2 sm:mb-3">
                            <div className="flex items-center">
                              <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 mr-1" />
                              <span className="text-xs sm:text-sm font-medium text-gray-900">{place.distance}</span>
                            </div>
                            <div className="flex items-center">
                              <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 fill-current mr-1" />
                              <span className="text-xs sm:text-sm font-medium text-gray-900">{place.rating}</span>
                              <span className="text-xs sm:text-sm text-gray-500 ml-1">({place.reviews})</span>
                            </div>
                          </div>

                          <div className="flex items-center mb-2">
                            <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 mr-1 flex-shrink-0" />
                            <span className={`text-xs sm:text-sm font-medium truncate ${
                              place.isOpen ? 'text-green-600' : 'text-red-600'
                            }`}>
                              {place.hours}
                            </span>
                          </div>

                          <div className="flex flex-wrap gap-2 mb-3">
                            {place.services.slice(0, 2).map((service, idx) => (
                              <span key={idx} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                                {service}
                              </span>
                            ))}
                            {place.services.length > 2 && (
                              <span className="text-xs text-gray-500">
                                +{place.services.length - 2} more
                              </span>
                            )}
                          </div>

                          <div className="flex space-x-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleCallPlace(place.phone);
                              }}
                              className="flex-1 flex items-center justify-center px-3 py-2 bg-green-500 text-white text-xs font-medium rounded hover:bg-green-600 transition-colors"
                            >
                              <Phone className="w-3 h-3 mr-1" />
                              Call
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDirections(place);
                              }}
                              className="flex-1 flex items-center justify-center px-3 py-2 bg-blue-500 text-white text-xs font-medium rounded hover:bg-blue-600 transition-colors"
                            >
                              <Navigation className="w-3 h-3 mr-1" />
                              Directions
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Quick Actions - Enhanced */}
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-3 sm:p-6 lg:block hidden">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button
                  onClick={handleEmergencyServices}
                  className="w-full flex items-center justify-between p-4 text-left hover:bg-red-50 rounded-lg transition-colors duration-200 border border-red-200 bg-red-50"
                >
                  <div className="flex items-center">
                    <Shield className="w-5 h-5 text-red-500 mr-3" />
                    <div>
                      <span className="text-red-700 font-medium text-sm sm:text-base">Emergency Services</span>
                      <p className="text-xs text-red-600">24/7 emergency care</p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-red-400" />
                </button>
                
                <button
                  onClick={handleFindPharmacies}
                  className="w-full flex items-center justify-between p-3 text-left hover:bg-green-50 rounded-lg transition-colors duration-200"
                >
                  <div className="flex items-center">
                    <Pill className="w-5 h-5 text-green-500 mr-3" />
                    <span className="text-gray-700 text-sm sm:text-base">Find Pharmacies</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </button>
                
                <button
                  onClick={handleFind24Hours}
                  className="w-full flex items-center justify-between p-3 text-left hover:bg-blue-50 rounded-lg transition-colors duration-200"
                >
                  <div className="flex items-center">
                    <Clock className="w-5 h-5 text-blue-500 mr-3" />
                    <span className="text-gray-700 text-sm sm:text-base">24/7 Services</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Quick Actions - Enhanced */}
        <div className="lg:hidden mt-4 bg-white rounded-xl shadow-lg p-3">
          <h3 className="text-base font-bold text-gray-900 mb-3">Quick Actions</h3>
          <div className="grid grid-cols-1 xs:grid-cols-3 gap-2">
            <button
              onClick={handleEmergencyServices}
              className="flex flex-col items-center justify-center p-4 text-center hover:bg-red-50 rounded-lg transition-colors duration-200 border border-red-200"
            >
              <Shield className="w-6 h-6 text-red-500 mb-1" />
              <span className="text-red-700 text-xs font-medium">Emergency</span>
            </button>
            <button
              onClick={handleFindPharmacies}
              className="flex flex-col items-center justify-center p-4 text-center hover:bg-green-50 rounded-lg transition-colors duration-200"
            >
              <Pill className="w-6 h-6 text-green-500 mb-1" />
              <span className="text-green-700 text-xs font-medium">Pharmacies</span>
            </button>
            <button
              onClick={handleFind24Hours}
              className="flex flex-col items-center justify-center p-4 text-center hover:bg-blue-50 rounded-lg transition-colors duration-200"
            >
              <Clock className="w-6 h-6 text-blue-500 mb-1" />
              <span className="text-blue-700 text-xs font-medium">24/7 Open</span>
            </button>
          </div>
        </div>

        {/* Emergency Call Button - Always visible */}
        <div className="fixed bottom-6 right-6 z-50">
          <button
            onClick={() => window.location.href = 'tel:199'}
            className="w-14 h-14 bg-red-500 hover:bg-red-600 text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
            title="Emergency Call - 199"
          >
            <Phone className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
}