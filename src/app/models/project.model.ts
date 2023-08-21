import { Group } from "./group.model";
import { Image } from "./image.model";

export interface Project {
    id: number;
    name: string;
    groups: Group[];
    image: Image;
    url: string;
}