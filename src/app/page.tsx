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
      <div className="bg-gray-100 w-full gap-12 flex flex-col pt-12">
        <section id="services">
          <Services />
        </section>
        <section id="testimonials">
          <Testimonials />
        </section>
        <section id="quote">
          <QuoteRequest />
        </section>
      </div>
    </Layout>
  );
}
