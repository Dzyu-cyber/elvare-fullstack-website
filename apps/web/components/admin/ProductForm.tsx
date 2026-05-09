'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Upload, X, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { ImageUploader } from '@/components/admin/ImageUploader';

const productSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'),
  slug: z.string().min(3, 'Slug must be at least 3 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  category: z.string().min(1, 'Category is required'),
  price: z.coerce.number().min(0, 'Price must be positive'),
  comparePrice: z.coerce.number().optional(),
  tags: z.string().optional(),
  isPublished: z.boolean().default(false),
  isFeatured: z.boolean().default(false),
});

type ProductFormValues = z.infer<typeof productSchema>;

interface ProductFormProps {
  initialData?: Partial<ProductFormValues>;
}

export function ProductForm({ initialData }: ProductFormProps) {
  const [variants, setVariants] = useState([{ size: 'M', color: 'Black', stock: 10, sku: 'SKU-001' }]);
  const [images, setImages] = useState<string[]>([]);

  const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: {
      isPublished: false,
      isFeatured: false,
      ...initialData,
    },
  });

  const onSubmit = (data: ProductFormValues) => {
    console.log('Form Data:', data);
    console.log('Variants:', variants);
    console.log('Images:', images);
    // Here we would call the API
  };

  // Auto-generate slug from name
  const name = watch('name');
  const generateSlug = () => {
    if (name) {
      const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      setValue('slug', slug);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Basic Info & Pricing */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Info */}
          <div className="bg-surface border border-border rounded-xl p-6 space-y-4">
            <h2 className="text-xl font-bold text-text-primary">Basic Information</h2>
            
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">Product Name</label>
              <input
                type="text"
                {...register('name')}
                onBlur={generateSlug}
                className="w-full bg-surface-2 border border-border rounded-lg px-4 py-2.5 text-sm text-text-primary focus:outline-none focus:border-primary transition-colors"
                placeholder="e.g. Silk Emerald Dress"
              />
              {errors.name && <p className="text-xs text-danger mt-1">{errors.name.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">Slug</label>
              <input
                type="text"
                {...register('slug')}
                className="w-full bg-surface-2 border border-border rounded-lg px-4 py-2.5 text-sm text-text-primary focus:outline-none focus:border-primary transition-colors"
                placeholder="e.g. silk-emerald-dress"
              />
              {errors.slug && <p className="text-xs text-danger mt-1">{errors.slug.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">Description</label>
              <textarea
                {...register('description')}
                rows={5}
                className="w-full bg-surface-2 border border-border rounded-lg px-4 py-2.5 text-sm text-text-primary focus:outline-none focus:border-primary transition-colors"
                placeholder="Describe the product..."
              />
              {errors.description && <p className="text-xs text-danger mt-1">{errors.description.message}</p>}
            </div>
          </div>

          {/* Pricing */}
          <div className="bg-surface border border-border rounded-xl p-6 space-y-4">
            <h2 className="text-xl font-bold text-text-primary">Pricing</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">Price ($)</label>
                <input
                  type="number"
                  step="0.01"
                  {...register('price')}
                  className="w-full bg-surface-2 border border-border rounded-lg px-4 py-2.5 text-sm text-text-primary focus:outline-none focus:border-primary transition-colors"
                  placeholder="0.00"
                />
                {errors.price && <p className="text-xs text-danger mt-1">{errors.price.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">Compare At Price ($)</label>
                <input
                  type="number"
                  step="0.01"
                  {...register('comparePrice')}
                  className="w-full bg-surface-2 border border-border rounded-lg px-4 py-2.5 text-sm text-text-primary focus:outline-none focus:border-primary transition-colors"
                  placeholder="0.00"
                />
                {errors.comparePrice && <p className="text-xs text-danger mt-1">{errors.comparePrice.message}</p>}
              </div>
            </div>
          </div>

          {/* Variants Builder */}
          <div className="bg-surface border border-border rounded-xl p-6 space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-text-primary">Variants</h2>
              <button
                type="button"
                onClick={() => setVariants([...variants, { size: 'M', color: 'Black', stock: 0, sku: '' }])}
                className="text-primary text-sm font-medium hover:text-primary-dark transition-colors flex items-center space-x-1"
              >
                <Plus className="w-4 h-4" />
                <span>Add Variant</span>
              </button>
            </div>
            
            <div className="space-y-3">
              {variants.map((variant, index) => (
                <div key={index} className="grid grid-cols-1 sm:grid-cols-4 gap-3 p-3 bg-surface-2 rounded-lg border border-border/50">
                  <div>
                    <label className="block text-xs font-medium text-text-secondary mb-1">Size</label>
                    <input
                      type="text"
                      value={variant.size}
                      onChange={(e) => {
                        const newVariants = [...variants];
                        newVariants[index].size = e.target.value;
                        setVariants(newVariants);
                      }}
                      className="w-full bg-surface border border-border rounded-md px-3 py-1.5 text-sm text-text-primary focus:outline-none focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-text-secondary mb-1">Color</label>
                    <input
                      type="text"
                      value={variant.color}
                      onChange={(e) => {
                        const newVariants = [...variants];
                        newVariants[index].color = e.target.value;
                        setVariants(newVariants);
                      }}
                      className="w-full bg-surface border border-border rounded-md px-3 py-1.5 text-sm text-text-primary focus:outline-none focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-text-secondary mb-1">Stock</label>
                    <input
                      type="number"
                      value={variant.stock}
                      onChange={(e) => {
                        const newVariants = [...variants];
                        newVariants[index].stock = Number(e.target.value);
                        setVariants(newVariants);
                      }}
                      className="w-full bg-surface border border-border rounded-md px-3 py-1.5 text-sm text-text-primary focus:outline-none focus:border-primary"
                    />
                  </div>
                  <div className="flex items-end space-x-2">
                    <div className="flex-1">
                      <label className="block text-xs font-medium text-text-secondary mb-1">SKU</label>
                      <input
                        type="text"
                        value={variant.sku}
                        onChange={(e) => {
                          const newVariants = [...variants];
                          newVariants[index].sku = e.target.value;
                          setVariants(newVariants);
                        }}
                        className="w-full bg-surface border border-border rounded-md px-3 py-1.5 text-sm text-text-primary focus:outline-none focus:border-primary"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => setVariants(variants.filter((_, i) => i !== index))}
                      className="p-2 text-text-muted hover:text-danger hover:bg-danger/10 rounded-md transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Organization & Media */}
        <div className="space-y-6">
          {/* Status & Visibility */}
          <div className="bg-surface border border-border rounded-xl p-6 space-y-4">
            <h2 className="text-xl font-bold text-text-primary">Visibility</h2>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-text-primary">Published</p>
                <p className="text-xs text-text-muted">Visible on storefront</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" {...register('isPublished')} className="sr-only peer" />
                <div className="w-11 h-6 bg-surface-2 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-text-muted after:border-text-muted after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:bg-bg peer-checked:after:border-bg peer-checked:bg-primary"></div>
              </label>
            </div>

            <div className="flex items-center justify-between border-t border-border pt-4">
              <div>
                <p className="text-sm font-medium text-text-primary">Featured</p>
                <p className="text-xs text-text-muted">Show on homepage</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" {...register('isFeatured')} className="sr-only peer" />
                <div className="w-11 h-6 bg-surface-2 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-text-muted after:border-text-muted after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:bg-bg peer-checked:after:border-bg peer-checked:bg-primary"></div>
              </label>
            </div>
          </div>

          {/* Organization */}
          <div className="bg-surface border border-border rounded-xl p-6 space-y-4">
            <h2 className="text-xl font-bold text-text-primary">Organization</h2>
            
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">Category</label>
              <select
                {...register('category')}
                className="w-full bg-surface-2 border border-border rounded-lg px-4 py-2.5 text-sm text-text-primary focus:outline-none focus:border-primary transition-colors"
              >
                <option value="">Select Category</option>
                <option value="dresses">Dresses</option>
                <option value="tops">Tops</option>
                <option value="bottoms">Bottoms</option>
                <option value="shoes">Shoes</option>
              </select>
              {errors.category && <p className="text-xs text-danger mt-1">{errors.category.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">Tags</label>
              <input
                type="text"
                {...register('tags')}
                className="w-full bg-surface-2 border border-border rounded-lg px-4 py-2.5 text-sm text-text-primary focus:outline-none focus:border-primary transition-colors"
                placeholder="e.g. summer, silk, new"
              />
            </div>
          </div>

          {/* Media */}
          <div className="bg-surface border border-border rounded-xl p-6 space-y-4">
            <h2 className="text-xl font-bold text-text-primary">Media</h2>
            <ImageUploader onImagesChange={(urls) => setImages(urls)} />
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end space-x-4">
        <button
          type="button"
          className="bg-surface-2 border border-border px-6 py-2.5 rounded-lg text-sm font-medium text-text-secondary hover:text-text-primary hover:border-border-hover transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-primary text-bg font-medium px-6 py-2.5 rounded-lg hover:bg-primary-dark transition-colors shadow-glow-green"
        >
          Save Product
        </button>
      </div>
    </form>
  );
}
