import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function TestMarginsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20 py-8">
      <Container>
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Margin Consistency Test</h1>
          <p className="text-muted-foreground">Testing responsive margins across all screen sizes</p>
        </div>

        <div className="space-y-8">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Container Margin Test</h2>
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline">Mobile: px-4</Badge>
                <Badge variant="outline">SM: px-6</Badge>
                <Badge variant="outline">MD: px-8</Badge>
                <Badge variant="outline">LG: px-12</Badge>
                <Badge variant="outline">XL: px-16</Badge>
                <Badge variant="outline">2XL: px-20</Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                This page tests the consistent margins across all screen sizes. 
                The Container component should provide consistent left and right margins that progressively increase with screen size.
              </p>
            </div>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-2">Left Margin Check</h3>
              <p className="text-sm text-muted-foreground">
                Verify that left margin is consistent and increases appropriately with screen size.
              </p>
            </Card>
            
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-2">Right Margin Check</h3>
              <p className="text-sm text-muted-foreground">
                Verify that right margin is consistent and increases appropriately with screen size.
              </p>
            </Card>
          </div>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-2">Full Width Content</h3>
            <div className="h-32 bg-gradient-to-r from-primary/20 to-primary/10 rounded-lg flex items-center justify-center">
              <p className="text-sm text-muted-foreground">This content should respect container margins</p>
            </div>
          </Card>
        </div>
      </Container>
    </div>
  );
}