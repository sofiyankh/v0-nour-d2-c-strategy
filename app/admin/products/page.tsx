'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { createClient } from '@/lib/supabase/client'
import { ArrowLeft, Plus, Trash2, Edit, Image as ImageIcon } from 'lucide-react'

export default function AdminProductsPage() {
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    nameAr: '',
    category: 'skincare',
    price: '',
    description: '',
    descriptionAr: '',
    ingredients: '',
    rating: '4.5',
  })
  const supabase = createClient()

  useEffect(() => {
    loadProducts()
  }, [])

  const loadProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setProducts(data || [])
    } catch (error) {
      console.error('Error loading products:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const productData = {
        ...formData,
        price: parseFloat(formData.price),
        rating: parseFloat(formData.rating),
        ingredients: formData.ingredients.split(',').map(i => i.trim()),
      }

      if (editingId) {
        const { error } = await supabase
          .from('products')
          .update(productData)
          .eq('id', editingId)
        if (error) throw error
      } else {
        const { error } = await supabase
          .from('products')
          .insert([productData])
        if (error) throw error
      }

      setFormData({
        name: '',
        nameAr: '',
        category: 'skincare',
        price: '',
        description: '',
        descriptionAr: '',
        ingredients: '',
        rating: '4.5',
      })
      setEditingId(null)
      setShowForm(false)
      loadProducts()
    } catch (error) {
      console.error('Error saving product:', error)
    }
  }

  const editProduct = (product: any) => {
    setFormData({
      name: product.name,
      nameAr: product.nameAr,
      category: product.category,
      price: product.price.toString(),
      description: product.description,
      descriptionAr: product.descriptionAr,
      ingredients: product.ingredients.join(', '),
      rating: product.rating.toString(),
    })
    setEditingId(product.id)
    setShowForm(true)
  }

  const deleteProduct = async (productId: string) => {
    if (!confirm('هل أنت متأكد من حذف هذا المنتج؟')) return

    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', productId)

      if (error) throw error
      loadProducts()
    } catch (error) {
      console.error('Error deleting product:', error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-muted-foreground">جاري التحميل...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/admin/dashboard">
              <ArrowLeft className="w-5 h-5 text-foreground cursor-pointer hover:text-primary" />
            </Link>
            <h1 className="font-amiri text-2xl font-bold text-foreground">إدارة المنتجات</h1>
          </div>
          <Button
            onClick={() => {
              setEditingId(null)
              setFormData({
                name: '',
                nameAr: '',
                category: 'skincare',
                price: '',
                description: '',
                descriptionAr: '',
                ingredients: '',
                rating: '4.5',
              })
              setShowForm(!showForm)
            }}
            className="bg-primary hover:bg-primary/90"
          >
            <Plus className="w-4 h-4 ml-2" />
            منتج جديد
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Form */}
        {showForm && (
          <div className="bg-card rounded-lg border border-border p-6 mb-8">
            <h2 className="font-semibold text-lg mb-6">
              {editingId ? 'تعديل المنتج' : 'منتج جديد'}
            </h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                placeholder="Product name (English)"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
              <Input
                placeholder="اسم المنتج (عربي)"
                value={formData.nameAr}
                onChange={(e) => setFormData({ ...formData, nameAr: e.target.value })}
                required
              />
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="px-3 py-2 border border-border rounded-lg"
              >
                <option value="skincare">Skincare</option>
                <option value="makeup">Makeup</option>
              </select>
              <Input
                type="number"
                step="0.01"
                placeholder="Price"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                required
              />
              <textarea
                placeholder="Description (English)"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="px-3 py-2 border border-border rounded-lg col-span-1 md:col-span-2"
                rows={3}
              />
              <textarea
                placeholder="الوصف (عربي)"
                value={formData.descriptionAr}
                onChange={(e) => setFormData({ ...formData, descriptionAr: e.target.value })}
                className="px-3 py-2 border border-border rounded-lg col-span-1 md:col-span-2"
                rows={3}
              />
              <Input
                placeholder="Ingredients (comma separated)"
                value={formData.ingredients}
                onChange={(e) => setFormData({ ...formData, ingredients: e.target.value })}
                className="col-span-1 md:col-span-2"
              />
              <Input
                type="number"
                step="0.1"
                placeholder="Rating"
                value={formData.rating}
                onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
              />
              <div className="flex gap-2">
                <Button type="submit" className="flex-1 bg-primary">
                  {editingId ? 'تحديث' : 'إضافة'}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setShowForm(false)
                    setEditingId(null)
                  }}
                  className="flex-1"
                >
                  إلغاء
                </Button>
              </div>
            </form>
          </div>
        )}

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-card rounded-lg border border-border overflow-hidden">
              <div className="h-40 bg-muted flex items-center justify-center">
                <ImageIcon className="w-8 h-8 text-muted-foreground" />
              </div>
              <div className="p-4 space-y-3">
                <div>
                  <h3 className="font-semibold text-foreground">{product.name}</h3>
                  <p className="text-sm text-muted-foreground">{product.nameAr}</p>
                </div>
                <p className="text-lg font-bold text-primary">{product.price.toFixed(2)} د.ت</p>
                <p className="text-xs text-muted-foreground line-clamp-2">{product.description}</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => editProduct(product)}
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-secondary/10 text-secondary rounded-lg hover:bg-secondary/20 transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                    تعديل
                  </button>
                  <button
                    onClick={() => deleteProduct(product.id)}
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-destructive/10 text-destructive rounded-lg hover:bg-destructive/20 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                    حذف
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
