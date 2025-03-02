"use client";
import Testimonials from "@/components/Testimonials";
import Services from "@/components/Services/Services";
import Hero from "@/components/Hero/Hero";
import QuoteRequest from "@/components/QuoteRequest";
import Layout from "@/components/Layout";

export default function Home() {
  return (
    <Layout title="Inicio" navigationPaths={undefined}>
      <Hero />
      <div className="bg-white w-full" >
        <Services />
        <Testimonials />
        <QuoteRequest />
      </div>
    </Layout>
  );
}
