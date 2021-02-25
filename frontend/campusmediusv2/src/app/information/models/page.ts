import { Information } from '@app/information/models/information';

export interface Page {
    id: string;
    titleDe: string;
    titleEn: string;
    abstractDe: string;
    abstractEn: string;
    mobileAbstractDe: string;
    mobileAbstractEn: string;
    keywordsDe: string[];
    keywordsEn: string[];
    information: Information;
    informationId: string;
}
