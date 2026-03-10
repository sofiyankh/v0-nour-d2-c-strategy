'use client'

import Header from '@/components/header'
import Hero from '@/components/hero'
import Products from '@/components/products'
import Story from '@/components/story'
import Ingredients from '@/components/ingredients'
import Newsletter from '@/components/newsletter'
import Footer from '@/components/footer'

export default function Home() {
  return (
    <main className="bg-background text-foreground">
      <Header />
      <Hero />
      <Products />
      <Story />
      <Ingredients />
      <Newsletter />
      <Footer />
    </main>
  )
}
