'use client';

import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function About() {
  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-24 max-w-4xl">
        <article className="prose prose-lg max-w-none">
          <h1 className="text-4xl font-bold mb-10 text-center">Why Ask Experts?</h1>
          
          <div className="space-y-6 text-lg leading-relaxed">
            <p>The <strong>Internet</strong> was created to connect people to knowledge and services.</p>
            
            <p>Communication was asynchronous — you&apos;d publish a post, an advertisement, a question, and wait hours or days for replies. The Web became the publishing medium.</p>
            
            <p>Ads became the way to make money, as people spent hours sifting through published content. Google and Facebook became the gateways to that content, as the number of publishers grew rapidly — now reaching billions.</p>
            
            <p>But that model may have peaked.</p>
            
            <p>LLMs have introduced a new experience: ask a specific, detailed question and expect an immediate, personalized answer. Sifting through content no longer makes any sense.</p>
            
            <p>Q&A platforms are the first to suffer — Stack Overflow is <a href="https://blog.pragmaticengineer.com/stack-overflow-is-almost-dead/" className="text-blue-600 hover:underline">down 70%</a> since ChatGPT. 
              Quora has <a href="https://quorablog.quora.com/New-Funding-from-Andreessen-Horowitz" className="text-blue-600 hover:underline">pivoted</a> to Poe.com.
            </p>
            
            <p>News outlets are <a href="https://futurism.com/google-ai-destroying-news-media" className="text-blue-600 hover:underline">next in line</a>. Google execs believe its search will <a href="https://searchengineland.com/google-search-traffic-decline-inevitable-455345" className="text-blue-600 hover:underline">inevitably</a> lose traffic to AI. The rest will be impacted just as much — maybe not as quickly.</p>
            
            <p>Soon, the only clients on your website will be AI crawlers.</p>
            
            <p>No one to show ads to. No one to ask for their email. No one to engage with directly.</p>
            
            <p>I believe the Web as a publishing medium <em>for humans</em> has peaked.</p>
            
            <p>There&apos;s no going back. Human traffic won&apos;t drop to zero overnight, but it will decline year after year, while AI-based apps see increasing adoption.</p>

            <p>Social media apps will probably last longer due to their entertainment value, but AI-generated stuff is shaking those places too.</p>
            
            <p>So, do publishers have any future?</p>
            
            <h2 className="text-3xl font-bold mt-12 mb-6">How About a Paywall?</h2>
            
            <p>In a Web where the only clients are AI bots, how will publishers make money?</p>
            
            <p>One option is for bots to pay for each request. Publishers wouldn&apos;t need to change the nature of their business — just keep adding pages to their website, add some server middleware, and charge for every access.</p>
            
            <p>I&apos;d prefer Bitcoin and Lightning to be used as payment rails, but centralized solutions like <a href="https://blog.cloudflare.com/introducing-pay-per-crawl/" className="text-blue-600 hover:underline">Pay Per Crawl</a> could work too.</p>
            
            <p>The problem? There will only be a handful of dominant bots, run by major AI platforms. Your only customers will be Google, OpenAI, and Anthropic. They&apos;ll squeeze every bit of margin out of you — and then train on your content until they no longer need you at all.</p>
            
            <h2 className="text-3xl font-bold mt-12 mb-6">How About a Paradigm Shift?</h2>
            
            <p>Today, people Google something, open 3–5 tabs, read through them, and occasionally ask a follow-up question in the comments. That&apos;s how they interact with domain <em>experts</em> on the old Web. It takes time and delivers generic, non-personalized answers.</p>
            
            <p>What would the UX be like if we all switched from Google to ChatGPT?</p>
            
            <p>The &quot;Web search&quot; feature in ChatGPT offers a glimpse of that future: you ask a specific question, ChatGPT uses Google to find relevant pages, crawls them, and summarizes the findings.</p>
            
            <p>That&apos;s automation. That&apos;s good. But it&apos;s not an AI-native solution — it still relies on generic content found via a generic query.</p>
            
            <p>Ideally, I&apos;d like to ask any niche expert in the world my specific question and get personalized answers — which my LLM would summarize. In real time. Without ads funding the interaction.</p>
            
            <p>That&apos;s what the <a href="https://github.com/nostrband/askexperts/blob/main/NIP-174.md" className="text-blue-600 hover:underline">AskExperts protocol</a> is for.</p>
            
            <h2 className="text-3xl font-bold mt-12 mb-6">AskExperts Protocol</h2>
            
            <ul className="list-disc pl-10 space-y-2">
              <li>Let anyone run experts — LLM-based agents with domain knowledge.</li>
              <li>Let anyone discover experts in real time for their specific question.</li>
              <li>Let anyone pay experts peer-to-peer.</li>
            </ul>
            
              <p>Instead of adding new pages to your site, you add new documents to the RAG of your expert.</p>
              <p>Instead of building new APIs and web services, you add MCP tools to your expert.</p>
              <p>Instead of Googling, reading, and deducing, you let your LLM find and talk to niche experts to get specific answers.</p>
            
            <p>All in real time, without leaving your AI chat, assistant, or app interface.</p>
            
            <p>The protocol is open and uses Nostr for discovery and data transfer. It supports any payment method, with Lightning as the default. It allows anything as a payload — plain text, OpenAI API data format, etc. Experts can even be hosted at home, utilizing the dormant supply of hardware.</p>
 
            <p className="font-bold text-xl mt-8 text-center"><strong>Sounds promising?</strong> Learn more <a href="https://github.com/nostrband/askexperts" className="text-blue-600 hover:underline">here</a>.</p>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}