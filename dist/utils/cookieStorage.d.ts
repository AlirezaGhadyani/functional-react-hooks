import Cookies from 'js-cookie';
declare const _default: {
    attributes: Cookies.CookieAttributes;
    converter: Required<Cookies.Converter<string>>;
    set(name: string, value: string, options?: Cookies.CookieAttributes | undefined): string | undefined;
    get(name: string): string | undefined;
    get(): {
        [key: string]: string;
    };
    remove(name: string, options?: Cookies.CookieAttributes | undefined): void;
    withAttributes(attributes: Cookies.CookieAttributes): Cookies.CookiesStatic<string>;
    withConverter<TConv = string>(converter: Cookies.Converter<TConv>): Cookies.CookiesStatic<TConv>;
    noConflict?(): Cookies.CookiesStatic<string>;
};
export default _default;
