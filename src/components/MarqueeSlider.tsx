import { cn } from "@/lib/utils";
import { Marquee } from "@/components/magicui/marquee";
import Image from "next/image";

const reviews = [
  {
    name: "Sophia Reynolds",
    username: "@sophia",
    body: "Absolutely love the product quality and the fast shipping! Will definitely be back for more.",
    img: "https://avatar.vercel.sh/sophia",
  },
  {
    name: "Jill",
    username: "@jill",
    body: "Everything was exactly as described. Great customer support and smooth checkout process. 10/10 experience!",
    img: "https://avatar.vercel.sh/jill",
  },
  {
    name: "John",
    username: "@john",
    body: "I’ve ordered twice now and both times my experience was top-notch. Highly recommended!",
    img: "https://avatar.vercel.sh/john",
  },
  {
    name: "Jane",
    username: "@jane",
    body: "Your site is easy to navigate and I love the deals! Everything arrived on time and in perfect condition.",
    img: "https://avatar.vercel.sh/jane",
  },
  {
    name: "Jenny",
    username: "@jenny",
    body: "From ordering to delivery, everything was seamless. Great service and great products!",
    img: "https://avatar.vercel.sh/jenny",
  },
  {
    name: "James",
    username: "@james",
    body: "Super impressed with the packaging and delivery. The products are truly premium.",
    img: "https://avatar.vercel.sh/james",
  },
];

const firstRow = reviews.slice(0, reviews.length / 2);

const ReviewCard = ({
  img,
  name,
  username,
  body,
}: {
  img: string;
  name: string;
  username: string;
  body: string;
}) => {
  return (
    <figure
      className={cn(
        "relative h-full w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
        // light styles
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        // dark styles
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
      )}
    >
      <div className="flex flex-row items-center gap-2">
       
        <Image
          src={img}
          alt="User avatar"
          width={32}
          height={32}
          className="rounded-full"
        />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium dark:text-white">
            {name}
          </figcaption>
          <p className="text-xs font-medium dark:text-white/40">{username}</p>
        </div>
      </div>
      <blockquote className="mt-2 text-sm">{body}</blockquote>
    </figure>
  );
};

export function MarqueeSlider() {
  return (
    <div className="relative flex max-w-7xl w-full mx-auto flex-col items-center justify-center overflow-hidden mb-14 mt-14  ">
      <div className=" mx-auto px-4 text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
          ⭐ Customer Reviews
        </h2>
        <p className="mt-2 text-gray-600 dark:text-gray-400 text-sm">
          See what our customers are saying about us.
        </p>
      </div>

      <Marquee pauseOnHover className="[--duration:20s]">
        {firstRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background"></div>
    </div>
  );
}
