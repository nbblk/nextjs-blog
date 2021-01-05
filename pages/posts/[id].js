import Head from 'next/head';
import Layout from '../../components/layout';
import Date from '../../components/date';
import utilstyles from '../../styles/utils.module.css';

import { getAllPostIds, getPostData } from '../../lib/posts';

export async function getStaticPaths() {
    const paths = getAllPostIds();
    return {
        paths,
        fallback: false
    }
};

export async function getStaticProps({ params }) {
    const postData = await getPostData(params.id);
    return {
        props: {
            postData
        }
    }
};

export default function Post({ postData }) {
    return (
    <Layout>
        <Head>
            <title>{postData.title}</title>
        </Head>
        <article>
            <h1 classname={utilstyles.headingX1}>{postData.title}</h1>
        <br/>{postData.id}<br/>
        <div className={utilstyles.lightText}>
            <Date dateString={postData.date}/>
        </div>
            <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
        </article>
    </Layout>)
};