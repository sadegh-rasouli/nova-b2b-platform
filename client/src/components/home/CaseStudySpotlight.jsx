import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, TrendingUp, Award } from 'lucide-react';
import { projectService } from '../../services';
import { mockProjects } from '../../data/mockData';
import { Badge, Button } from '../common';

export default function CaseStudySpotlight() {
  const [featuredProject, setFeaturedProject] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function loadProject() {
      try {
        const response = await projectService.getProjects();
        if (isMounted && response?.data?.length > 0) {
          const featured = response.data.find((p) => p.isFeatured) || response.data[0];
          setFeaturedProject(featured);
        } else if (isMounted) {
          setFeaturedProject(mockProjects[0]);
        }
      } catch (err) {
        if (isMounted) setFeaturedProject(mockProjects[0]);
      }
    }

    loadProject();
    return () => {
      isMounted = false;
    };
  }, []);

  if (!featuredProject) return null;

  return (
    <section className="py-20 bg-white border-b border-industrial-200">
      <div className="container-custom">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="space-y-2 max-w-xl">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-brand-600">
              Proven Engineering Outcomes
            </span>
            <h2 className="text-3xl sm:text-4xl font-black font-display text-industrial-950 tracking-tight">
              Case Study Spotlight
            </h2>
            <p className="text-sm text-industrial-600">
              Explore how NOVA compounding engineers collaborate with manufacturing leaders to replace metals and optimize cycle economics.
            </p>
          </div>

          <Button
            to="/projects"
            variant="outline"
            size="md"
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            All Case Studies
          </Button>
        </div>

        {/* Featured Case Study Hero Box */}
        <div className="rounded-2xl border border-industrial-200 bg-industrial-50/70 p-8 lg:p-10 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Story & Metrics */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="accent">{featuredProject.industry}</Badge>
              <Badge variant="tech">{featuredProject.materialUsed}</Badge>
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold font-display text-industrial-950 tracking-tight leading-snug">
              {featuredProject.title}
            </h3>

            <div className="space-y-3 text-xs sm:text-sm text-industrial-600 leading-relaxed">
              <p>
                <strong className="text-industrial-900 font-semibold">The Challenge: </strong>
                {featuredProject.challenge}
              </p>
              <p>
                <strong className="text-industrial-900 font-semibold">The NOVA Solution: </strong>
                {featuredProject.solution}
              </p>
            </div>

            {/* Metrics Chips */}
            {featuredProject.metrics?.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                {featuredProject.metrics.map((m) => (
                  <div key={m.label} className="p-3 rounded-lg bg-white border border-industrial-200 text-center">
                    <div className="text-lg font-black font-display text-brand-600 tracking-tight">
                      {m.value}
                    </div>
                    <div className="text-[11px] font-mono text-industrial-500 mt-0.5">
                      {m.label}
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="pt-2">
              <Button
                to={`/projects/${featuredProject.slug}`}
                variant="primary"
                size="md"
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Read Complete Case Study
              </Button>
            </div>
          </div>

          {/* Right Column: Case Visual */}
          <div className="lg:col-span-5">
            <div className="relative rounded-xl overflow-hidden border border-industrial-200 shadow-md h-72 lg:h-96">
              <img
                src={featuredProject.coverImage}
                alt={featuredProject.title}
                loading="lazy"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-industrial-950/70 via-transparent to-transparent flex items-end p-6">
                <div className="text-white text-xs font-mono space-y-1">
                  <div className="font-semibold text-brand-300">Client Profile:</div>
                  <div>{featuredProject.clientType}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
