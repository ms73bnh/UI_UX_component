'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Cpu, Zap, Shield, ArrowUpRight, BarChart3, Globe } from 'lucide-react';

interface BentoItemProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  tag?: string;
  colSpan?: string;
  bgGradient?: string;
}

const BentoCard: React.FC<BentoItemProps> = ({ title, description, icon, tag, colSpan = 'col-span-1', bgGradient }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative group overflow-hidden rounded-3xl p-6 bg-slate-900 border border-gray-800 transition-all duration-300 hover:border-gray-600 ${colSpan}`}
    >
      {/* Radial Hover Glow */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(59, 130, 246, 0.15), transparent 80%)`,
        }}
      />

      <div className="relative z-10 flex flex-col justify-between h-full min-h-[140px]">
        <div className="flex items-center justify-between mb-4">
          <div className="w-10 h-10 rounded-2xl bg-slate-800 border border-gray-700/60 flex items-center justify-center text-blue-400 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all">
            {icon}
          </div>
          {tag && (
            <span className="px-2.5 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/20 text-[10px] font-bold rounded-full uppercase">
              {tag}
            </span>
          )}
        </div>

        <div>
          <h4 className="text-white font-bold text-base group-hover:text-blue-300 transition-colors flex items-center gap-1">
            {title}
            <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-blue-400" />
          </h4>
          <p className="text-gray-400 text-xs mt-1 leading-relaxed">{description}</p>
        </div>
      </div>
    </div>
  );
};

export const BentoGridPreview: React.FC = () => {
  return (
    <div className="w-full p-6 bg-slate-950 rounded-2xl border border-gray-800 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-white font-bold text-lg flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-blue-400 animate-pulse" />
            Bento Grid Layout
          </h3>
          <p className="text-gray-400 text-xs">마우스 커서를 카드 위에 올려 Hover Glow 트래킹 효과를 확인하세요.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
        <BentoCard
          colSpan="md:col-span-2"
          title="초고속 AI 코드 생성 엔진"
          description="실시간 컨텍스트 파싱 기반 0.1초 반응속도 코드 오토 컴플릿 지원"
          icon={<Zap className="w-5 h-5" />}
          tag="Core Engine"
        />
        <BentoCard
          title="실시간 인프라 대시보드"
          description="클라우드 노드 상태 모니터링"
          icon={<BarChart3 className="w-5 h-5" />}
          tag="Metrics"
        />
        <BentoCard
          title="글로벌 에지 엣지 CDN"
          description="전 세계 200+ 에지 로케이션"
          icon={<Globe className="w-5 h-5" />}
        />
        <BentoCard
          colSpan="md:col-span-2"
          title="엔터프라이즈 보안 및 권한 제어"
          description="Zero-Trust 접근 제어 및 SOC2 인증 완비"
          icon={<Shield className="w-5 h-5" />}
          tag="Security"
        />
      </div>
    </div>
  );
};
