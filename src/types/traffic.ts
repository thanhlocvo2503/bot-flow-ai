export interface Competitor {
    domain: string;
    traffic: number;
    competitionLvl: number;
}

export interface DataType {
    domain: string;
    source: {
        url: string;
        name: string;
        method: string;
    };
    traffic: {
        semrushRank: number;
        totalTraffic: number;
        adwordsTraffic: number;
        organicTraffic: number;
    };
    dbStatus: string;
    aiSources: {
        sources: {
            domain: string;
            mentions_count: number;
        }[];
    };
    authority: {
        backlinks: number;
        authorityScore: number;
        referringDomains: number;
    };
    aiOverview: {
        citedPages: number;
        visibility: number;
    };
    competitors: Competitor[];
}
