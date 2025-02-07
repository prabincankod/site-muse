'use client';

import { useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import IconMenu from '@/components/icon-menu';
import Delete from '@/components/icons/delete';
import ThreeDots from '@/components/icons/three-dots';
import { LinkCard } from '@/components/link/link-card';
import { useCreateLinkModal } from '@/components/modals/create-link-modal';
import { useDeleteProjectModal } from '@/components/modals/delete-project-modal';
import { useUpdateProjectModal } from '@/components/modals/update-project-modal';
import Popover from '@/components/popover';
import { Button } from '@/components/ui/button';
import { Card, CardHeader } from '@/components/ui/card';
import { Edit3 } from 'lucide-react';

type ProjectProps = {
  project: any;
  links: any;
};

export const Project = ({ project, links }: ProjectProps) => {
  const props = {
    projectId: project.id,
    projectName: project.name,
    projectColor: project.color,
  };
  const [openPopover, setOpenPopover] = useState(false);

  const { setShowCreateLinkModal, CreateLinkModal } = useCreateLinkModal({
    props: { projectId: props.projectId },
  });

  const { setShowDeleteProjectModal, DeleteProjectModal } =
    useDeleteProjectModal({
      props: { projectId: props.projectId },
    });

  const { setShowUpdateProjectModal, UpdateProjectModal } =
    useUpdateProjectModal({
      props: {
        projectId: props.projectId,
        projectName: props.projectName,
        projectColor: props.projectColor,
      },
    });

  return (
    <>
      <CreateLinkModal />
      <UpdateProjectModal />
      <DeleteProjectModal />
      <div>
        <Link
          href="/dashboard"
          className="flex flex-row space-x-1 items-center group"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-1.5 h-4 w-4 group-hover:text-slate-500"
          >
            <path d="m15 18-6-6 6-6"></path>
          </svg>
          <p className="group-hover:text-slate-500">Back</p>
        </Link>
      </div>
      <div className="mt-8 flex flex-col items-start justify-between gap-4 border-b border-gray-200 pb-5 sm:flex-row sm:items-center sm:gap-0">
        <div className="flex flex-row space-x-2 items-center">
          <h1 className="mb-3 font-heading text-5xl font-semibold text-gray-900 lg:text-6xl">
            {project?.name}
          </h1>
        </div>
        <div className="flex flex-row space-x-2">
          <Button
            onClick={() => {
              setShowCreateLinkModal(true);
            }}
          >
            Add Link
          </Button>
          <Popover
            content={
              <div className="grid w-full gap-px p-2 sm:w-48">
                <button
                  onClick={() => {
                    setOpenPopover(false);
                    setShowUpdateProjectModal(true);
                  }}
                  className="group flex w-full items-center justify-between rounded-md p-2 text-left text-sm font-medium text-gray-500 transition-all duration-75 hover:bg-gray-100"
                >
                  <IconMenu text="Edit" icon={<Edit3 className="h-4 w-4" />} />
                  <kbd className="hidden rounded bg-gray-100 px-2 py-0.5 text-xs font-light text-gray-500 transition-all duration-75 group-hover:bg-gray-200 sm:inline-block">
                    E
                  </kbd>
                </button>
                <button
                  onClick={() => {
                    setOpenPopover(false);
                    setShowDeleteProjectModal(true);
                  }}
                  className="group flex w-full items-center justify-between rounded-md p-2 text-left text-sm font-medium text-red-600 transition-all duration-75 hover:bg-red-600 hover:text-white"
                >
                  <IconMenu
                    text="Delete"
                    icon={<Delete className="h-4 w-4" />}
                  />
                  <kbd className="hidden rounded bg-red-100 px-2 py-0.5 text-xs font-light text-red-600 transition-all duration-75 group-hover:bg-red-500 group-hover:text-white sm:inline-block">
                    X
                  </kbd>
                </button>
              </div>
            }
            align="end"
            openPopover={openPopover}
            setOpenPopover={setOpenPopover}
          >
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setOpenPopover(!openPopover);
              }}
              className="rounded-md px-1 py-2 transition-all duration-75 hover:bg-gray-100 active:bg-gray-200"
            >
              <span className="sr-only">Edit</span>
              <ThreeDots className="h-7 w-7 text-gray-500" />
            </button>
          </Popover>
        </div>
      </div>

      {links.length === 0 ? (
        <div className="relative flex flex-col items-center gap-4 p-8 h-full flex-1 mt-8">
          <p className="mt-1 text-sm text-zinc-500">
            Let&#39;s create your first Link.
          </p>
          <div className="mt-8"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3   gap-2 pb-10 mt-8">
          {links.map((link: any) => {
            const options = {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            } as const;
            const formattedDate = link.createdAt.toLocaleString(
              'en-US',
              options,
            );

            return (
              <LinkCard key={link.id} projectId={props.projectId} item={link} />
            );
          })}
        </div>
      )}
    </>
  );
};
