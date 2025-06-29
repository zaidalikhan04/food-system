import React, { useState } from 'react';
import { Search, Filter, Star, Clock, MapPin, Plus, Heart } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { Restaurant, MenuItem } from '../../types';

const BrowseRestaurants: React.FC = () => {
  const { addItem } = useCart();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCuisine, setSelectedCuisine] = useState('');
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [favorites, setFavorites] = useState<string[]>(['1', '3']);

  const mockRestaurants: Restaurant[] = [
    {
      id: '1',
      name: 'Pizza Palace',
      description: 'Authentic Italian pizzas made with fresh ingredients',
      image: 'https://images.pexels.com/photos/2147491/pexels-photo-2147491.jpeg?auto=compress&cs=tinysrgb&w=400',
      cuisine: 'Italian',
      rating: 4.8,
      deliveryTime: '25-35 min',
      deliveryFee: 3.99,
      ownerId: 'owner1',
      isOpen: true
    },
    {
      id: '2',
      name: 'Burger Barn',
      description: 'Juicy burgers and crispy fries',
      image: 'https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg?auto=compress&cs=tinysrgb&w=400',
      cuisine: 'American',
      rating: 4.6,
      deliveryTime: '20-30 min',
      deliveryFee: 2.99,
      ownerId: 'owner2',
      isOpen: true
    },
    {
      id: '3',
      name: 'Sushi Zen',
      description: 'Fresh sushi and Japanese cuisine',
      image: 'https://images.pexels.com/photos/2098085/pexels-photo-2098085.jpeg?auto=compress&cs=tinysrgb&w=400',
      cuisine: 'Japanese',
      rating: 4.9,
      deliveryTime: '30-40 min',
      deliveryFee: 4.99,
      ownerId: 'owner3',
      isOpen: false
    },
    {
      id: '4',
      name: 'Taco Fiesta',
      description: 'Authentic Mexican tacos and burritos',
      image: 'https://images.pexels.com/photos/4958792/pexels-photo-4958792.jpeg?auto=compress&cs=tinysrgb&w=400',
      cuisine: 'Mexican',
      rating: 4.7,
      deliveryTime: '15-25 min',
      deliveryFee: 2.49,
      ownerId: 'owner4',
      isOpen: true
    }
  ];

  const mockMenuItems: MenuItem[] = [
    {
      id: '1',
      restaurantId: '1',
      name: 'Margherita Pizza',
      description: 'Fresh tomatoes, mozzarella, basil, and olive oil',
      price: 16.99,
      image: 'https://images.pexels.com/photos/2147491/pexels-photo-2147491.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Main Course',
      available: true,
      ingredients: ['Tomatoes', 'Mozzarella', 'Basil', 'Olive Oil'],
      allergens: ['Dairy', 'Gluten']
    },
    {
      id: '2',
      restaurantId: '1',
      name: 'Pepperoni Pizza',
      description: 'Classic pepperoni with mozzarella cheese',
      price: 18.99,
      image: 'https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Main Course',
      available: true,
      ingredients: ['Pepperoni', 'Mozzarella', 'Tomato Sauce'],
      allergens: ['Dairy', 'Gluten']
    },
    {
      id: '3',
      restaurantId: '1',
      name: 'Caesar Salad',
      description: 'Crisp romaine lettuce, parmesan, croutons, and caesar dressing',
      price: 12.50,
      image: 'https://images.pexels.com/photos/2097090/pexels-photo-2097090.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Appetizers',
      available: true,
      ingredients: ['Romaine Lettuce', 'Parmesan', 'Croutons', 'Caesar Dressing'],
      allergens: ['Dairy', 'Gluten']
    }
  ];

  const cuisines = ['All', 'Italian', 'American', 'Japanese', 'Mexican', 'Chinese', 'Indian'];

  const filteredRestaurants = mockRestaurants.filter(restaurant => {
    const matchesSearch = restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          restaurant.cuisine.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCuisine = selectedCuisine === '' || selectedCuisine === 'All' || restaurant.cuisine === selectedCuisine;
    return matchesSearch && matchesCuisine;
  });

  const toggleFavorite = (restaurantId: string) => {
    setFavorites(prev => 
      prev.includes(restaurantId) 
        ? prev.filter(id => id !== restaurantId)
        : [...prev, restaurantId]
    );
  };

  const handleAddToCart = (menuItem: MenuItem) => {
    addItem(menuItem);
    // You could add a toast notification here
  };

  const getRestaurantMenuItems = (restaurantId: string) => {
    return mockMenuItems.filter(item => item.restaurantId === restaurantId);
  };

  if (selectedRestaurant) {
    const menuItems = getRestaurantMenuItems(selectedRestaurant.id);
    
    return (
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setSelectedRestaurant(null)}
            className="text-orange-500 hover:text-orange-600 font-medium"
          >
            ← Back to Restaurants
          </button>
          <button
            onClick={() => toggleFavorite(selectedRestaurant.id)}
            className={`p-2 rounded-full transition-colors ${
              favorites.includes(selectedRestaurant.id)
                ? 'text-red-500 hover:text-red-600'
                : 'text-gray-400 hover:text-red-500'
            }`}
          >
            <Heart className={`h-6 w-6 ${favorites.includes(selectedRestaurant.id) ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Restaurant Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="relative h-48">
            <img
              src={selectedRestaurant.image}
              alt={selectedRestaurant.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end">
              <div className="p-6 text-white">
                <h1 className="text-3xl font-bold mb-2">{selectedRestaurant.name}</h1>
                <p className="text-white/90 mb-2">{selectedRestaurant.description}</p>
                <div className="flex items-center space-x-4 text-sm">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                    {selectedRestaurant.rating}
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {selectedRestaurant.deliveryTime}
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    ${selectedRestaurant.deliveryFee} delivery
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Menu</h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {menuItems.map((item) => (
                <div key={item.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-32 object-cover"
                  />
                  <div className="p-4">
                    <h4 className="font-semibold text-gray-900 mb-1">{item.name}</h4>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">{item.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-orange-500">${item.price.toFixed(2)}</span>
                      <button
                        onClick={() => handleAddToCart(item)}
                        className="bg-orange-500 text-white p-2 rounded-lg hover:bg-orange-600 transition-colors"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Browse Restaurants</h1>
        <p className="text-gray-600">Discover great food from local restaurants</p>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search restaurants or cuisines..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-gray-400" />
            <select
              value={selectedCuisine}
              onChange={(e) => setSelectedCuisine(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
            >
              {cuisines.map(cuisine => (
                <option key={cuisine} value={cuisine === 'All' ? '' : cuisine}>
                  {cuisine}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Restaurant Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRestaurants.map((restaurant) => (
          <div
            key={restaurant.id}
            className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => setSelectedRestaurant(restaurant)}
          >
            <div className="relative">
              <img
                src={restaurant.image}
                alt={restaurant.name}
                className="w-full h-48 object-cover"
              />
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavorite(restaurant.id);
                }}
                className={`absolute top-3 right-3 p-2 rounded-full bg-white shadow-md transition-colors ${
                  favorites.includes(restaurant.id)
                    ? 'text-red-500 hover:text-red-600'
                    : 'text-gray-400 hover:text-red-500'
                }`}
              >
                <Heart className={`h-5 w-5 ${favorites.includes(restaurant.id) ? 'fill-current' : ''}`} />
              </button>
              {!restaurant.isOpen && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                  <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Closed
                  </span>
                </div>
              )}
            </div>
            
            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-gray-900">{restaurant.name}</h3>
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                  <span className="text-sm text-gray-600">{restaurant.rating}</span>
                </div>
              </div>
              
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">{restaurant.description}</p>
              
              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  {restaurant.deliveryTime}
                </div>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  ${restaurant.deliveryFee} delivery
                </div>
              </div>
              
              <div className="mt-3">
                <span className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full">
                  {restaurant.cuisine}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredRestaurants.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No restaurants found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default BrowseRestaurants;