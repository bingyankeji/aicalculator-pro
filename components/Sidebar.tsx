'use client';

import Link from 'next/link';
import { SmartSearch } from './SmartSearch';
import { getActualCategories } from '@/lib/categoryStats';

const categories = getActualCategories();

export function Sidebar() {
  return (
    <div className="space-y-4">
      {/* Smart Search Box */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <SmartSearch />
      </div>

      {/* Categories */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold text-gray-900">Categories</h3>
          <Link 
            href="/calculators"
            className="text-xs text-blue-600 hover:text-blue-700 font-medium"
          >
            View All
          </Link>
        </div>
        <ul className="space-y-1">
          {categories.map((category) => (
            <li key={category.name}>
              <Link
                href={category.url}
                className="flex items-center justify-between py-2 px-3 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors group"
              >
                <div className="flex items-center gap-2">
                  <span className="text-lg">{category.icon}</span>
                  <span className="group-hover:text-blue-600">{category.name}</span>
                </div>
                <span className="text-xs font-bold text-blue-600">
                  {category.count}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
