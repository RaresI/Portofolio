import React from 'react';
import { FaGithub, FaExternalLinkAlt, FaChevronRight } from 'react-icons/fa';
import { Project } from '../data/projects';

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
}

export default function ProjectCard({ project, onClick }: ProjectCardProps) {
  return (
    <div 
      className="group relative bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer border border-gray-100 dark:border-gray-700 overflow-hidden"
      onClick={onClick}
    >
      <div className="flex flex-col md:flex-row md:items-center gap-6 p-6">
        {/* Left Section - Title and Description */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4 mb-3">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
              {project.title}
            </h3>
            <FaChevronRight className="text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:translate-x-1 transition-all duration-300 flex-shrink-0 mt-1" />
          </div>
          <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2">
            {project.technologies.slice(0, 3).map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 bg-gray-50 dark:bg-gray-700/50 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 3 && (
              <span className="px-2.5 py-1 bg-gray-50 dark:bg-gray-700/50 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium">
                +{project.technologies.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* Right Section - Links */}
        <div className="flex md:flex-col gap-4 md:gap-2 md:items-end md:border-l md:border-gray-100 dark:md:border-gray-700 md:pl-6 md:min-w-[140px]">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 group/link"
            >
              <FaGithub className="text-lg group-hover/link:scale-110 transition-transform duration-300" />
              <span className="text-sm font-medium hidden md:inline">Code</span>
            </a>
          )}
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 group/link"
            >
              <FaExternalLinkAlt className="text-lg group-hover/link:scale-110 transition-transform duration-300" />
              <span className="text-sm font-medium hidden md:inline">Demo</span>
            </a>
          )}
        </div>
      </div>

      {/* Hover Effect Border */}
      <div className="absolute inset-0 border-2 border-transparent group-hover:border-blue-500/20 dark:group-hover:border-blue-400/20 rounded-xl transition-colors duration-300"></div>
    </div>
  );
} 