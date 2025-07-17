import { cn } from "@/lib/utils";
import { Marquee } from "@/components/magicui/marquee";
import Image from "next/image";

const reviews = [
  {
    name: "Jack",
    username: "@jack",
    body: "I've never seen anything like this before. It's amazing. I love it.",
    img: "https://avatar.vercel.sh/jack",
  },
  {
    name: "Jill",
    username: "@jill",
    body: "I don't know what to say. I'm speechless. This is amazing.",
    img: "https://avatar.vercel.sh/jill",
  },
  {
    name: "John",
    username: "@john",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://avatar.vercel.sh/john",
  },
  {
    name: "Jane",
    username: "@jane",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://avatar.vercel.sh/jane",
  },
  {
    name: "Jenny",
    username: "@jenny",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://avatar.vercel.sh/jenny",
  },
  {
    name: "James",
    username: "@james",
    body: "I'm at a loss for words. This is amazing. I love it.",
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
        {/* <img className="rounded-full" width="32" height="32" alt="" src={img} /> */}
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
    <div className="relative flex max-w-7xl w-full flex-col items-center justify-center overflow-hidden mb-14 mt-14  ">
      <div className=" mx-auto px-4 text-center mb-8">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
          🤝 Our Trusted Partners
        </h2>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Proudly collaborating with world-renowned tech brands.
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

// "use client";

// import Image from "next/image";
// import { cn } from "@/lib/utils";
// import { Marquee } from "@/components/magicui/marquee";

// // const partners = [
// //   {
// //     name: "Apple",
// //     logo: "/partners/apple.png",
// //   },
// //   {
// //     name: "Samsung",
// //     logo: "/partners/samsung.png",
// //   },
// //   {
// //     name: "Sony",
// //     logo: "/partners/sony.png",
// //   },
// //   {
// //     name: "Microsoft",
// //     logo: "/partners/microsoft.png",
// //   },
// //   {
// //     name: "Intel",
// //     logo: "/partners/intel.png",
// //   },
// //   {
// //     name: "Dell",
// //     logo: "/partners/dell.png",
// //   },
// //   {
// //     name: "HP",
// //     logo: "/partners/hp.png",
// //   },
// //   {
// //     name: "Amazon",
// //     logo: "/partners/amazon.png",
// //   },
// // ];

// const partners = [
//   {
//     name: "Jack",
//     username: "@jack",
//     body: "I've never seen anything like this before. It's amazing. I love it.",
//     img: "https://avatar.vercel.sh/jack",
//   },
//   {
//     name: "Jill",
//     username: "@jill",
//     body: "I don't know what to say. I'm speechless. This is amazing.",
//     img: "https://avatar.vercel.sh/jill",
//   },
//   {
//     name: "John",
//     username: "@john",
//     body: "I'm at a loss for words. This is amazing. I love it.",
//     img: "https://avatar.vercel.sh/john",
//   },
//   {
//     name: "Jane",
//     username: "@jane",
//     body: "I'm at a loss for words. This is amazing. I love it.",
//     img: "https://avatar.vercel.sh/jane",
//   },
//   {
//     name: "Jenny",
//     username: "@jenny",
//     body: "I'm at a loss for words. This is amazing. I love it.",
//     img: "https://avatar.vercel.sh/jenny",
//   },
//   {
//     name: "James",
//     username: "@james",
//     body: "I'm at a loss for words. This is amazing. I love it.",
//     img: "https://avatar.vercel.sh/james",
//   },
// ];

// const MarqueeCard = ({ logo, name }: { logo: string; name: string }) => (
//   <div
//     className={cn(
//       "w-40 h-24 flex items-center justify-center rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm mx-2",
//       "hover:scale-105 transition-transform duration-300"
//     )}
//   >
//     <Image src={logo} alt={name} width={100} height={60} className="object-contain" />
//   </div>
// );

// export function MarqueeSlider() {
//   const row = [...partners, ...partners]; // Duplicate for seamless loop

//   return (
//     <section className="w-full bg-muted py-16">
//       <div className="max-w-7xl mx-auto px-4 text-center mb-8">
//         <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
//           🤝 Our Trusted Partners
//         </h2>
//         <p className="mt-2 text-gray-600 dark:text-gray-400">
//           Proudly collaborating with world-renowned tech brands.
//         </p>
//       </div>

//       <div className="relative flex items-center overflow-hidden">
//         <Marquee pauseOnHover className="[--duration:25s]">
//           {row.map((partner, index) => (
//             <MarqueeCard key={`${partner.name}-${index}`} {...partner} />
//           ))}
//         </Marquee>

//         {/* Fade Effects */}
//         <div className="pointer-events-none absolute left-0 top-0 h-full w-1/6 bg-gradient-to-r from-muted" />
//         <div className="pointer-events-none absolute right-0 top-0 h-full w-1/6 bg-gradient-to-l from-muted" />
//       </div>
//     </section>
//   );
// }
