import { ArrowRight } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-blue-600 to-blue-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-block bg-blue-500 bg-opacity-50 rounded-full px-4 py-2 mb-6">
              <span className="text-sm">Trusted by 10,000+ Businesses</span>
            </div>
            
            <h1 className="text-4xl lg:text-5xl xl:text-6xl mb-6">
              Streamline Your Business Procurement
            </h1>
            
            <p className="text-lg lg:text-xl text-blue-100 mb-8 max-w-xl">
              Access wholesale pricing, bulk ordering, and dedicated account management. Everything your business needs in one place.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors inline-flex items-center justify-center gap-2">
                Request a Quote
                <ArrowRight className="w-5 h-5" />
              </button>
              <button className="border-2 border-white px-8 py-3 rounded-lg hover:bg-white hover:text-blue-600 transition-colors">
                Browse Catalog
              </button>
            </div>
            
            <div className="flex gap-8 mt-12">
              <div>
                <div className="text-3xl mb-1">500K+</div>
                <div className="text-blue-200 text-sm">Products</div>
              </div>
              <div>
                <div className="text-3xl mb-1">24/7</div>
                <div className="text-blue-200 text-sm">Support</div>
              </div>
              <div>
                <div className="text-3xl mb-1">48h</div>
                <div className="text-blue-200 text-sm">Delivery</div>
              </div>
            </div>
          </div>
          
          <div className="relative hidden lg:block">
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1684695749267-233af13276d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXJlaG91c2UlMjBpbmR1c3RyaWFsfGVufDF8fHx8MTc2Nzk3ODA1NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Warehouse and logistics"
                className="w-full h-96 object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
