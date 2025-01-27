## About Project

- This is simple web app, in that smaller level educational data can manage like teacher, students and more.

## Used Technologies

- React 19.0.0
- Next 15.1.3
- Tailwind
- Shadcn
- Next API
- MongoDB
- Mongoose
- React-icons
- React-hot-toast
- React-chartjs-2
- Chart.js
- Axios
- Nodemailer
- AWS S3 - for image store
- Redux toolkit
- Redux toolkit query
- Websocket/Socket.io/Socket.io-client

## NextJs Core Concepts

## getStaticProps

- getStaticProps is use for static site generation from a page.
- Nextjs will pre render the page at a build time using props (data required to render page) which is send by getStaticProps.
- ## When should i use getStaticProps ?
  - The data required to available at page build time instead of the user request.
  - Headless CMS site
  - The page must be pre rendered (SEO) and be very fast use getStaticProps generates HTML and JSON files both are cached by CDN for performance.
- ## When should i use getStaticProps ?
  - getStaticProps run always on next build
  - getStaticProps run on fallback false
  - getStaticProps run on demand on background using revalidate().
- ## Example

  ```
  // posts will be populated at build time by getStaticProps()
  export default function Blog({ posts }) {
    return (
      <ul>
        {posts.map((post) => (
          <li>{post.title}</li>
        ))}
      </ul>
    )
  }

  // This function gets called at build time on server-side.
  // It won't be called on client-side, so you can even do
  // direct database queries.
  export async function getStaticProps() {
    // Call an external API endpoint to get posts.
    // You can use any data fetching library
    const res = await fetch('https://.../posts')
    const posts = await res.json()

    // By returning { props: { posts } }, the Blog component
    // will receive `posts` as a prop at build time
    return {
      props: {
        posts,
      },
    }
  }
  ```

## getServerSideProps

- getServerSideProps is Nextjs function which can be used to fetch data at server on user request and render the content of page at request time.

- In below example you can see, data can be fetched by third party api in getServerSideProps and return that data to page.

- ## Example

```
// posts will be populated at build time by getStaticProps()
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'

type Repo = {
name: string
stargazers_count: number
}

export const getServerSideProps = (async () => {
// Fetch data from external API
  const res = await fetch('https://api.github.com/repos/vercel/next.js')
  const repo: Repo = await res.json()
  // Pass data to the page via props
  return { props: { repo } }
  }) satisfies GetServerSideProps<{ repo: Repo }>

  export default function Page({
  repo,
  }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
      <main>
      <p>{repo.stargazers_count}</p>
      </main>
  )
}
```
