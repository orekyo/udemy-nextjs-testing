import Link from 'next/link';
import Layout from '../../components/Layout'
import { getAllPostIds, getPostData } from '../../lib/fetch';
import { POST } from '../../types/Types'
import { GetStaticProps, GetStaticPaths } from 'next';

const PostDetail: React.FC<POST> = ({ id, title, body }) => {
    return (
        <Layout title="">
            <p className="m-4">
                {'ID : '}
                {id}
            </p>
            <p className="mb-4 text-xl font-bold">{title}</p>
            <p className="mx-10 mb-12">{body}</p>
            <Link href="/blog-page">
                <div className="flex cursor-pointer mt-12">
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-6 w-6 mr-3" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                    </svg>
                    <a data-testid="back-blog">Back to blog-page</a>
                </div>
            </Link>
        </Layout>
    )
}

export default PostDetail

export const getStaticPaths: GetStaticPaths = async () => {
    const paths = await getAllPostIds()
    return {
        paths,
        fallback: false,
    }
}

export const getStaticProps: GetStaticProps = async (ctx) => {
    const post = await getPostData(ctx.params.id as string)
    return {
        props: {
            ...post, // id, title, body に分割してファンクショナルコンポーネントのpropsに渡す
        },
    }
}


