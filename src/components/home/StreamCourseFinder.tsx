import { colleges } from "@/data/colleges"
import { courses } from "@/data/courses"
import { searchColleges } from "@/lib/collegeSearch"
import type { College } from "@/types"
import StreamCourseFinderClient, { type FinderItem } from "./StreamCourseFinderClient"

// "Find your perfect stream and course": replaces the older Browse by stream block. Counts are the real number of
// colleges in our data per stream; the course cards are the courses we have pages for. Server component.

const STREAM_FIELD: Record<string, College["stream"][]> = {
  Engineering: ["Engineering"], MBA: ["MBA", "Management"], Medical: ["Medical"], Law: ["Law"], Arts: ["Arts & Science"],
}
const STREAMS: { name: string; tint: string }[] = [
  { name: "MBA", tint: "bg-blue-50 text-[#024692]" },
  { name: "Engineering", tint: "bg-blue-50 text-[#024692]" },
  { name: "Medical", tint: "bg-blue-50 text-[#024692]" },
  { name: "Law", tint: "bg-blue-50 text-[#024692]" },
  { name: "Design", tint: "bg-blue-50 text-[#024692]" },
  { name: "Commerce", tint: "bg-blue-50 text-[#024692]" },
  { name: "Pharmacy", tint: "bg-blue-50 text-[#024692]" },
  { name: "Arts", tint: "bg-blue-50 text-[#024692]" },
]

function count(name: string): number {
  const s = STREAM_FIELD[name]
  return s ? colleges.filter((c) => s.includes(c.stream)).length : searchColleges(colleges, name).length
}

export default function StreamCourseFinder() {
  const streams: FinderItem[] = STREAMS.map((s) => {
    const n = count(s.name)
    return { name: s.name, sub: n > 0 ? `${n} colleges` : "Explore colleges", href: `/colleges?stream=${encodeURIComponent(s.name)}`, tint: s.tint }
  })
  const courseItems: FinderItem[] = courses.map((c) => ({
    name: c.name, sub: `${c.duration} · ${c.level} · ${c.stream}`, href: `/courses/${c.slug}`, tint: "bg-blue-50 text-[#024692]", icon: "course",
  }))
  return <StreamCourseFinderClient streams={streams} courses={courseItems} />
}
