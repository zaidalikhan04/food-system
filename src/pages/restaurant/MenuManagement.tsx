import React, { useState } from 'react';
import { Plus, Edit, Trash2, Search, Filter, Eye, EyeOff } from 'lucide-react';
import { MenuItem } from '../../types';
import MenuItemForm from '../../components/forms/MenuItemForm';

const MenuManagement: React.FC = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([
    {
      id: '1',
      restaurantId: 'rest1',
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
      restaurantId: 'rest1',
      name: 'Caesar Salad',
      description: 'Crisp romaine lettuce, parmesan, croutons, and caesar dressing',
      price: 12.50,
      image: 'https://images.pexels.com/photos/2097090/pexels-photo-2097090.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Appetizers',
      available: true,
      ingredients: ['Romaine Lettuce', 'Parmesan', 'Croutons', 'Caesar Dressing'],
      allergens: ['Dairy', 'Gluten']
    },
    {
      id: '3',
      restaurantId: 'rest1',
      name: 'Chocolate Cake',
      description: 'Rich chocolate cake with chocolate frosting',
      price: 8.99,
      image: 'https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Desserts',
      available: false,
      ingredients: ['Chocolate', 'Flour', 'Sugar', 'Eggs'],
      allergens: ['Dairy', 'Gluten', 'Eggs']
    }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | undefined>();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');

  const categories = ['All', 'Appetizers', 'Main Course', 'Desserts', 'Beverages', 'Sides'];

  const filteredItems = menuItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === '' || filterCategory === 'All' || item.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddItem = (itemData: Omit<MenuItem, 'id' | 'restaurantId'>) => {
    const newItem: MenuItem = {
      ...itemData,
      id: Math.random().toString(36).substr(2, 9),
      restaurantId: 'rest1'
    };
    setMenuItems(prev => [...prev, newItem]);
    setShowForm(false);
  };

  const handleEditItem = (itemData: Omit<MenuItem, 'id' | 'restaurantId'>) => {
    if (editingItem) {
      setMenuItems(prev => prev.map(item => 
        item.id === editingItem.id ? { ...item, ...itemData } : item
      ));
      setEditingItem(undefined);
      setShowForm(false);
    }
  };

  const handleDeleteItem = (id: string) => {
    if (confirm('Are you sure you want to delete this menu item?')) {
      setMenuItems(prev => prev.filter(item => item.id !== id));
    }
  };

  const toggleAvailability = (id: string) => {
    setMenuItems(prev => prev.map(item => 
      item.id === id ? { ...item, available: !item.available } : item
    ));
  };

  const startEdit = (item: MenuItem) => {
    setEditingItem(item);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingItem(undefined);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Menu Management</h1>
          <p className="text-gray-600">Manage your restaurant's menu items and pricing</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors flex items-center"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Item
        </button>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search menu items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-gray-400" />
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
            >
              {categories.map(category => (
                <option key={category} value={category === 'All' ? '' : category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Menu Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div key={item.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="relative">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-2 right-2 flex space-x-2">
                <button
                  onClick={() => toggleAvailability(item.id)}
                  className={`p-2 rounded-full ${item.available ? 'bg-green-500' : 'bg-gray-500'} text-white hover:opacity-80 transition-opacity`}
                  title={item.available ? 'Available' : 'Unavailable'}
                >
                  {item.available ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                </button>
              </div>
            </div>
            
            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-gray-900">{item.name}</h3>
                <span className="text-lg font-bold text-orange-500">${item.price.toFixed(2)}</span>
              </div>
              
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">{item.description}</p>
              
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                  {item.category}
                </span>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  item.available ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}>
                  {item.available ? 'Available' : 'Unavailable'}
                </span>
              </div>
              
              <div className="flex justify-between items-center">
                <button
                  onClick={() => startEdit(item)}
                  className="flex items-center text-blue-600 hover:text-blue-700 transition-colors"
                >
                  <Edit className="h-4 w-4 mr-1" />
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteItem(item.id)}
                  className="flex items-center text-red-600 hover:text-red-700 transition-colors"
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No menu items found matching your criteria.</p>
        </div>
      )}

      {/* Menu Item Form Modal */}
      {showForm && (
        <MenuItemForm
          item={editingItem}
          onSubmit={editingItem ? handleEditItem : handleAddItem}
          onCancel={handleCloseForm}
        />
      )}
    </div>
  );
};

export default MenuManagement;