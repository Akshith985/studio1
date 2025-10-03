import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { newsData } from '@/lib/data';
import { Separator } from './ui/separator';

export function NewsFeed() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Market News</CardTitle>
        <CardDescription>Latest financial news headlines.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {newsData.map((item, index) => (
            <div key={item.id}>
              <div className="space-y-1">
                <a
                  href="#"
                  className="text-sm font-medium hover:underline"
                >
                  {item.title}
                </a>
                <p className="text-sm text-muted-foreground">
                  {item.source} -{' '}
                  <span className="text-xs">{item.time}</span>
                </p>
              </div>
              {index < newsData.length - 1 && <Separator className="mt-4" />}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
