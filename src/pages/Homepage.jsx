import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';

const Homepage = () => {
  const items = useSelector((store) => store.itemStore.items || []);
  const dispatch = useDispatch();

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('default');

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((response) => response.json())
      .then((data) => dispatch({ type: 'LOAD', payload: data }))
      .catch((error) => console.error('Failed to load products:', error));
  }, [dispatch]);

  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(items.map((item) => item.category))];
    return ['All', ...uniqueCategories];
  }, [items]);

  const filteredItems = useMemo(() => {
    let updatedItems = [...items];

    if (selectedCategory !== 'All') {
      updatedItems = updatedItems.filter(
        (item) => item.category === selectedCategory
      );
    }

    if (searchTerm.trim()) {
      updatedItems = updatedItems.filter((item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    switch (sortBy) {
      case 'price-low-high':
        updatedItems.sort((a, b) => a.price - b.price);
        break;
      case 'price-high-low':
        updatedItems.sort((a, b) => b.price - a.price);
        break;
      case 'rating-high-low':
        updatedItems.sort((a, b) => b.rating.rate - a.rating.rate);
        break;
      case 'popular':
        updatedItems.sort((a, b) => b.rating.count - a.rating.count);
        break;
      case 'name-a-z':
        updatedItems.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'name-z-a':
        updatedItems.sort((a, b) => b.title.localeCompare(a.title));
        break;
      default:
        break;
    }

    return updatedItems;
  }, [items, selectedCategory, searchTerm, sortBy]);

  const formatCategory = (category) => {
    if (!category) return '';
    return category
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const cart_items = useSelector(store => store.cartStore.cart_items)

  const handleAddToCart = item => e => {
    e.preventDefault()

    let itemExists = cart_items.find(cart_item => cart_item.id == item.id )
    if(itemExists){
      Swal.fire({
      title:"Attention",
      text:"Item already in cart",
      icon:"warning",
      position: 'top-right',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true
    })
    return 
    }
    dispatch({ type: "ADD_TO_CART", payload: item })
    Swal.fire({
      title:"Congrats",
      text:"Item added to cart",
      icon:"success",
      position: 'top-right',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true
    })
  }



  return (
    <main className="min-h-screen bg-slate-50">
      {/* HERO */}
      <section className="border-b border-slate-200 bg-gradient-to-b from-white via-slate-50 to-sky-50/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            {/* Left */}
            <div className="max-w-2xl">
              <p className="inline-flex items-center rounded-full border border-sky-200 bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-sky-700 shadow-sm">
                Premium Everyday Shopping
              </p>

              <h1 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 leading-tight">
                Discover products with a
                <span className="block text-sky-700">clean premium feel</span>
              </h1>

              <p className="mt-5 text-base sm:text-lg leading-7 text-slate-600">
                Explore thoughtfully curated essentials with subtle styling,
                refined presentation, and a smooth shopping experience built for
                modern ecommerce.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <a
                  href="#products"
                  className="inline-flex items-center justify-center rounded-xl bg-sky-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-700"
                >
                  Shop Collection
                </a>

                <button
                  type="button"
                  onClick={() => {
                    setSelectedCategory('All');
                    setSearchTerm('');
                    setSortBy('default');
                  }}
                  className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-100"
                >
                  Reset Filters
                </button>
              </div>

              <div className="mt-10 grid grid-cols-3 gap-4">
                <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                  <p className="text-2xl font-bold text-slate-900">
                    {items.length || 0}
                  </p>
                  <p className="mt-1 text-sm text-slate-500">Products</p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                  <p className="text-2xl font-bold text-slate-900">
                    {categories.length > 0 ? categories.length - 1 : 0}
                  </p>
                  <p className="mt-1 text-sm text-slate-500">Categories</p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                  <p className="text-2xl font-bold text-slate-900">4.8</p>
                  <p className="mt-1 text-sm text-slate-500">Avg. Experience</p>
                </div>
              </div>
            </div>

            {/* Right */}
            <div className="relative">
              <div className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-xl shadow-slate-200/60">
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-2xl bg-slate-100 p-4">
                    <div className="h-44 rounded-xl bg-white border border-slate-200 flex items-center justify-center">
                      <div className="text-center">
                        <p className="text-sm font-medium text-slate-500">
                          Elegant
                        </p>
                        <p className="mt-2 text-xl font-semibold text-slate-800">
                          Subtle Design
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-2xl bg-sky-50 p-4">
                    <div className="h-44 rounded-xl bg-white border border-sky-100 flex items-center justify-center">
                      <div className="text-center">
                        <p className="text-sm font-medium text-slate-500">
                          Smart
                        </p>
                        <p className="mt-2 text-xl font-semibold text-slate-800">
                          Easy Filters
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-2xl bg-white border border-slate-200 p-4 col-span-2">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-sm text-slate-500">Shopping made</p>
                        <h3 className="text-2xl font-semibold text-slate-900">
                          Minimal, refined, effortless
                        </h3>
                      </div>
                      <div className="hidden sm:flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-600 text-white text-xl font-bold">
                        +
                      </div>
                    </div>
                    <p className="mt-3 text-sm leading-6 text-slate-600">
                      Built with clean structure, soft contrast, and premium
                      spacing for a polished storefront experience.
                    </p>
                  </div>
                </div>
              </div>

              <div className="absolute -z-10 inset-0 translate-x-4 translate-y-4 rounded-[2rem] bg-sky-100/50 blur-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* FILTER / SEARCH / SORT */}
      <section id="products" className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-slate-200 bg-white p-5 md:p-6 shadow-sm">
            <div className="flex flex-col gap-5">
              {/* Top heading row */}
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sky-700">
                    Browse Collection
                  </p>
                  <h2 className="mt-1 text-2xl md:text-3xl font-bold text-slate-900">
                    Find what fits your style
                  </h2>
                </div>

                <div className="text-sm text-slate-500">
                  Showing{' '}
                  <span className="font-semibold text-slate-700">
                    {filteredItems.length}
                  </span>{' '}
                  result{filteredItems.length === 1 ? '' : 's'}
                </div>
              </div>

              {/* Search + Sort */}
              <div className="grid grid-cols-1 lg:grid-cols-[1fr_240px] gap-4">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Search products
                  </label>
                  <input
                    type="text"
                    placeholder="Search by product title..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-sky-400 focus:bg-white focus:ring-4 focus:ring-sky-100"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Sort by
                  </label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-sky-400 focus:bg-white focus:ring-4 focus:ring-sky-100"
                  >
                    <option value="default">Default</option>
                    <option value="price-low-high">Price: Low to High</option>
                    <option value="price-high-low">Price: High to Low</option>
                    <option value="rating-high-low">Top Rated</option>
                    <option value="popular">Most Popular</option>
                    <option value="name-a-z">Name: A to Z</option>
                    <option value="name-z-a">Name: Z to A</option>
                  </select>
                </div>
              </div>

              {/* Category Filter Bar */}
              <div>
                <label className="mb-3 block text-sm font-medium text-slate-700">
                  Filter by category
                </label>
                <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent">
                  {categories.map((category) => {
                    const active = selectedCategory === category;

                    return (
                      <button
                        key={category}
                        type="button"
                        onClick={() => setSelectedCategory(category)}
                        className={`whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-medium transition ${active
                            ? 'bg-sky-600 text-white shadow-sm'
                            : 'border border-slate-300 bg-white text-slate-700 hover:border-slate-400 hover:bg-slate-50'
                          }`}
                      >
                        {formatCategory(category)}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* PRODUCT GRID */}
          <div className="mt-8">
            {items.length === 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
                {[...Array(8)].map((_, index) => (
                  <div
                    key={index}
                    className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm animate-pulse"
                  >
                    <div className="h-72 bg-slate-100" />
                    <div className="p-5">
                      <div className="h-3 w-24 rounded bg-slate-200" />
                      <div className="mt-4 h-4 w-full rounded bg-slate-200" />
                      <div className="mt-2 h-4 w-3/4 rounded bg-slate-200" />
                      <div className="mt-5 flex items-center justify-between">
                        <div className="h-6 w-20 rounded bg-slate-200" />
                        <div className="h-5 w-16 rounded-full bg-slate-200" />
                      </div>
                      <div className="mt-4 h-10 w-full rounded-xl bg-slate-200" />
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredItems.length === 0 ? (
              <div className="rounded-3xl border border-slate-200 bg-white px-6 py-16 text-center shadow-sm">
                <h3 className="text-2xl font-semibold text-slate-900">
                  No products found
                </h3>
                <p className="mt-3 text-slate-500">
                  Try changing the category, search term, or sort option.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedCategory('All');
                    setSearchTerm('');
                    setSortBy('default');
                  }}
                  className="mt-6 rounded-xl bg-sky-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-700"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
                {filteredItems.map((item) => (
                  <article
                    key={item.id}
                    className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/60"
                  >
                    {/* Image */}
                    <div className="relative flex h-72 items-center justify-center overflow-hidden bg-gradient-to-b from-slate-50 to-slate-100 p-8">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="max-h-52 w-full object-contain transition duration-300 group-hover:scale-105"
                      />

                      <div className="absolute top-4 left-4 rounded-full border border-slate-200 bg-white/90 px-3 py-1 text-xs font-semibold text-slate-700 backdrop-blur">
                        {formatCategory(item.category)}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <h3 className="min-h-[56px] text-base font-semibold leading-7 text-slate-900">
                        {item.title}
                      </h3>

                      <div className="mt-4 flex items-center justify-between">
                        <p className="text-2xl font-bold tracking-tight text-slate-900">
                          ${item.price}
                        </p>

                        <div className="rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">
                          ★ {item.rating?.rate}
                        </div>
                      </div>

                      <div className="mt-2 flex items-center justify-between text-sm text-slate-500">
                        <span>{item.rating?.count} reviews</span>
                        <span>Premium pick</span>
                      </div>

                      <button
                        onClick={handleAddToCart(item)}
                        type="button"
                        className="mt-5 w-full rounded-xl border border-slate-300 bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Homepage;