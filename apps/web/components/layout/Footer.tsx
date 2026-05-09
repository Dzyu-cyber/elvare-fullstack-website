import Link from "next/link";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export function Footer() {
  return (
    <footer className="bg-surface border-t border-border mt-auto">
      <div className="container mx-auto px-6 md:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Col 1: Brand */}
          <div className="space-y-4">
            <Link href="/" className="font-display text-2xl font-bold italic text-text-primary">
              ELVARÉ
            </Link>
            <p className="text-text-secondary text-sm">
              Sustainable luxury fashion for the modern era.
            </p>
            <div className="flex gap-4 text-text-muted text-sm">
              <a href="#" className="hover:text-primary transition-colors">
                Instagram
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                Twitter
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                Globe
              </a>
            </div>
          </div>

          {/* Col 2: Shop */}
          <div className="space-y-4">
            <h3 className="font-display text-lg font-semibold text-text-primary">Shop</h3>
            <ul className="space-y-2 text-sm text-text-secondary">
              <li><Link href="/shop" className="hover:text-primary transition-colors">All Products</Link></li>
              <li><Link href="/shop?category=new" className="hover:text-primary transition-colors">New Arrivals</Link></li>
              <li><Link href="/shop?category=sale" className="hover:text-primary transition-colors">Sale</Link></li>
              <li><Link href="/collections" className="hover:text-primary transition-colors">Collections</Link></li>
            </ul>
          </div>

          {/* Col 3: Help */}
          <div className="space-y-4">
            <h3 className="font-display text-lg font-semibold text-text-primary">Help</h3>
            <ul className="space-y-2 text-sm text-text-secondary">
              <li><Link href="/shipping" className="hover:text-primary transition-colors">Shipping</Link></li>
              <li><Link href="/returns" className="hover:text-primary transition-colors">Returns</Link></li>
              <li><Link href="/size-guide" className="hover:text-primary transition-colors">Size Guide</Link></li>
              <li><Link href="/faq" className="hover:text-primary transition-colors">FAQ</Link></li>
            </ul>
          </div>

          {/* Col 4: Newsletter */}
          <div className="space-y-4">
            <h3 className="font-display text-lg font-semibold text-text-primary">Stay Connected</h3>
            <p className="text-text-secondary text-sm">
              Subscribe to receive updates, access to exclusive deals, and more.
            </p>
            <div className="flex gap-2">
              <Input placeholder="Enter your email" className="flex-1" />
              <Button size="sm">Subscribe</Button>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-text-muted gap-4">
          <p>© 2026 ELVARÉ. All rights reserved.</p>
          <p>Built with ♥ for a sustainable future.</p>
        </div>
      </div>
    </footer>
  );
}
