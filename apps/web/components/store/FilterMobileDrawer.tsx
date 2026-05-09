'use client';

import { useState } from 'react';
import { Filter, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { FilterSidebar } from './FilterSidebar';
import { motion, AnimatePresence } from 'framer-motion';

export function FilterMobileDrawer() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:hidden">
      <Button
        variant="secondary"
        size="sm"
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2"
      >
        <Filter className="h-4 w-4" />
        Filters
      </Button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/50 z-50"
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed right-0 top-0 h-full w-80 bg-[var(--color-bg)] z-50 overflow-y-auto"
            >
              <div className="p-4 flex justify-between items-center border-b border-[var(--color-border)]">
                <h3 className="font-display text-xl text-[var(--color-text)]">Filters</h3>
                <button onClick={() => setIsOpen(false)} className="text-[var(--color-text-muted)] hover:text-[var(--color-text)]">
                  <X className="h-6 w-6" />
                </button>
              </div>
              <div className="p-4">
                <FilterSidebar />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
