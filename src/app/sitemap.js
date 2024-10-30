import { fetchBackendApiWrapper } from "@/utils/apiWrapper";

const EXTERNAL_DATA_URL = process.env.NEXT_PUBLIC_SITE_URL;
const LINKS_PER_SITEMAP = 5000;
// const getTotalSitemapLinksCount = async () => {
//   try {
//     const res = await fetchBackendApiWrapper(
//       `/totalSitemapLinks`,
//       {
//         method: "GET",
//       },
//       null
//     );
//     if (res && res.ok) {
//       const data = await res.json();
//       return data.totalCount;
//     }
//     throw new Error();
//   } catch (err) {
//     console.error('Error in getTotalSitemapLinksCount ', err);
//     return [];
//   }
// };

const getLinksForSitemap = async (id) => {
  try {
    const res = await fetchBackendApiWrapper(
      `/sitemap`,
      {
        method: "GET",
      },
      null
    );
    if (res && res.ok) {
      const data = await res.json();
      return data;
    }
    throw new Error();
  } catch (err) {
    console.error(err);
    return [];
  }
};
export async function generateSitemaps() {
  // Fetch the total number of products and calculate the number of sitemaps needed
  // const totalSize = await getTotalSitemapLinksCount();
  // console.log("totalSize ", Math.ceil(totalSize / LINKS_PER_SITEMAP));
  // const data = Array(Math.ceil(totalSize / LINKS_PER_SITEMAP))
  //   .fill()
  //   .map((x, i) => {
  //     return { id: i + 1 };
  //   });
  // return data;
  return [{id: 0}]
}

export default async function sitemap({ id }) {
  // Google's limit is 50,000 URLs per sitemap
  const links = await getLinksForSitemap(id);
  return links.map((l) => ({
    url: `${EXTERNAL_DATA_URL}/questionset/${l.testId}`,
    lastModified: l.createdAt,
  }));
}
