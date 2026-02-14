import { ArrowRight } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function CTA() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="p-8 lg:p-12 text-white">
              <h2 className="text-3xl lg:text-4xl mb-4">
                Ready to Streamline Your Business?
              </h2>
              <p className="text-lg text-blue-100 mb-8">
                Join thousands of businesses saving time and money with TradeHub. Get started with exclusive wholesale pricing today.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <button className="bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors inline-flex items-center justify-center gap-2">
                  Create Account
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button className="border-2 border-white px-8 py-3 rounded-lg hover:bg-white hover:text-blue-600 transition-colors">
                  Schedule Demo
                </button>
              </div>
              
              <div className="flex items-center gap-8 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-green-400 rounded-full flex items-center justify-center">
                    <span className="text-xs">✓</span>
                  </div>
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-green-400 rounded-full flex items-center justify-center">
                    <span className="text-xs">✓</span>
                  </div>
                  <span>Free trial available</span>
                </div>
              </div>
            </div>
            
            <div className="hidden lg:block h-full">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1521791136064-7986c2920216?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGhhbmRzaGFrZXxlbnwxfHx8fDE3Njc5MjI0NzV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Business partnership"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
