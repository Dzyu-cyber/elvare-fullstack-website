"use client";

import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Card } from "@/components/ui/Card";
import { Skeleton } from "@/components/ui/Skeleton";
import { Spinner } from "@/components/ui/Spinner";
import { Divider } from "@/components/ui/Divider";
import toast from "react-hot-toast";

export default function DevPage() {
  return (
    <div className="container mx-auto p-8 space-y-12 bg-bg text-text-primary min-h-screen">
      <header>
        <h1 className="text-4xl font-display font-bold text-primary">Design System & UI Components</h1>
        <p className="text-text-secondary mt-2">Preview of all base components for Elvaré.</p>
      </header>

      <Divider />

      {/* Buttons */}
      <section className="space-y-4">
        <h2 className="text-2xl font-display font-semibold">Buttons</h2>
        <div className="flex flex-wrap gap-4 items-center">
          <Button variant="primary">Primary Button</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="danger">Danger</Button>
        </div>
        <div className="flex flex-wrap gap-4 items-center">
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
        </div>
        <div className="flex flex-wrap gap-4 items-center">
          <Button disabled>Disabled</Button>
          <Button variant="secondary" disabled>Disabled Sec</Button>
        </div>
      </section>

      <Divider />

      {/* Badges */}
      <section className="space-y-4">
        <h2 className="text-2xl font-display font-semibold">Badges</h2>
        <div className="flex flex-wrap gap-4">
          <Badge>Default / Green</Badge>
          <Badge variant="muted">Muted</Badge>
          <Badge variant="danger">Danger</Badge>
          <Badge variant="warning">Warning</Badge>
        </div>
      </section>

      <Divider />

      {/* Inputs & Select */}
      <section className="space-y-4 max-w-md">
        <h2 className="text-2xl font-display font-semibold">Form Elements</h2>
        <div className="space-y-2">
          <label className="text-sm font-medium">Text Input</label>
          <Input placeholder="Enter text..." />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Select</label>
          <Select>
            <option>Option 1</option>
            <option>Option 2</option>
            <option>Option 3</option>
          </Select>
        </div>
      </section>

      <Divider />

      {/* Cards */}
      <section className="space-y-4">
        <h2 className="text-2xl font-display font-semibold">Cards</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-2">Default Card</h3>
            <p className="text-text-secondary">This is a standard card with a surface background and border.</p>
          </Card>
          <Card className="p-6" glow>
            <h3 className="text-lg font-semibold mb-2">Glowing Card</h3>
            <p className="text-text-secondary">This card has a subtle green glow effect on hover.</p>
          </Card>
        </div>
      </section>

      <Divider />

      {/* Loading & Feedback */}
      <section className="space-y-4">
        <h2 className="text-2xl font-display font-semibold">Loading & Feedback</h2>
        <div className="flex items-center gap-6">
          <Spinner size="sm" />
          <Spinner size="md" />
          <Spinner size="lg" />
        </div>
        <div className="space-y-2 max-w-md">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-20 w-full" />
        </div>
        <div className="flex gap-4">
          <Button onClick={() => toast.success("Action successful!")}>
            Show Success Toast
          </Button>
          <Button variant="danger" onClick={() => toast.error("Something went wrong!")}>
            Show Error Toast
          </Button>
        </div>
      </section>
    </div>
  );
}
