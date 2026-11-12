export const CATEGORIES=["Creatividad","Tecnología","Idiomas","Vida práctica","Bienestar","Emprendimiento"] as const;
export type Category=typeof CATEGORIES[number];
export type Ronda={id:string;title:string;description:string;outcome:string;category:Category;hostName:string;mode:"Presencial"|"En línea";city:string;location:string;startsAt:string;duration:number;capacity:number;bookedCount:number;image:string;sample:boolean;isOwner?:boolean;status?:string};
export type Profile={displayName:string;interests:string[];skill:string};
export type Viewer={authenticated:boolean;displayName:string;profile?:Profile;favorites:string[];bookings:string[]};
export const CATEGORY_IMAGES:Record<Category,string>={Creatividad:"/images/ceramica.jpg",Tecnología:"/images/digital.jpg",Idiomas:"/images/ingles.jpg","Vida práctica":"/images/cafe.jpg",Bienestar:"/images/plantas.jpg",Emprendimiento:"/images/fotografia.jpg"};
