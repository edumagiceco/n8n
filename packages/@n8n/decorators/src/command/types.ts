import type { Constructable } from '@n8n/di';
import type { AnyZodObject } from 'zod/v3';

type FlagsSchema = AnyZodObject;

export type CommandOptions = {
	name: string;
	description: string;
	examples?: string[];
	flagsSchema?: FlagsSchema;
};

export type ICommand = {
	flags?: object;
	init?: () => Promise<void>;
	run: () => Promise<void>;
	catch?: (e: Error) => Promise<void>;
	finally?: (e?: Error) => Promise<void>;
};

export type CommandClass = Constructable<ICommand>;

export type CommandEntry = {
	class: CommandClass;
	description: string;
	examples?: string[];
	flagsSchema?: FlagsSchema;
};
