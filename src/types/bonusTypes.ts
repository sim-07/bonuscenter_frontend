export interface BonusItem {
    code_id?: string;
    name: string;
    title: string;
    description: {
        it: string;
        en: string;
        [key: string]: string;
    };
    bonus_value: string;
    image: string;
    category: string;
    active: boolean;
}