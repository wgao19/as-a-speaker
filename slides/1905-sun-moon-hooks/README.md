# Sun Moon Toggle with Hooks 🌚🌝

In this talk, I'd like to speak with you how I created dark mode for my own site using hooks, and how I came to realization that with the tools we have on hand, it is possible to implement a generalized dark mode for any site, without having to come up with a load of CSS colors at all.

To implement a dark mode to a site, you need two things. First, you need a toggle to control dark mode and light mode. And second, you need to implement the actual styles for the dark mode. 

## The Hook

The toggle here is the hooks part. And in regards of styling, for those of you who missed my talk on mix blend mode, here is your second chance learning how to do this hipster dark mode to your site without writing any extra colors in your CSS.

![](https://i.imgur.com/vzexItp.gif)

I lied to you a little bit by saying I implemented this thing with hooks + and the UI. Because, before this talk, I already implemented the dark mode in my site using internal state. Let me first share with you what the code looked like before hooks.

My site has a Layout component that wraps around everything. It used to be a functional component, not anymore when I had to add an internal state for toggle.

![](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/5d625ada-5f3a-4b06-b496-295639bf85b6/class-component-state.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIAT73L2G45JWMQBEE4%2F20190621%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20190621T154248Z&X-Amz-Expires=86400&X-Amz-Security-Token=AgoJb3JpZ2luX2VjEGwaCXVzLXdlc3QtMiJHMEUCIQDFbF0ZfGI1Vef4GVEhf7h4XEAejcDHNXsmIHq1EGviLAIgEGfOa%2BxcDhP63%2ByOoo5cmZ%2FstdOrZ3NfLUuYSQVNmK4q4wMIpf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgwyNzQ1NjcxNDkzNzAiDPHM71t%2FMbLR1bmg8yq3A%2BXyRwtVzn3e9kI3aKPf96c13%2BkRQNvw5DsjjcpScIVIfoll2ShXPco3VCT1Z4%2FIM%2Bc0yWYOPCto3vYpzT5x3feku4jr87AwMsYaj5lrTRweYaO68VD%2F%2FP%2BARgk89FKRfzYxIQ27RfH3RH9eWMWgL77JZNJuWe1s%2FXdarpmtwMp%2F7cB7JFPlciWTcbcW3RXyLhhIFAJqw6hbOJawHBkeSv%2FmzFY4Dsyc1%2FQbRf%2BcWBv6%2BQebEtIDdcHIHUVYBPsYWG6ytPEn3cVdOx30NVSnODkeT4JWZzWrG0QqNhcM3AiolXninbMAIgDL2GOdOzcuscDL7lY6G6u0ux63Nrc%2BaQy%2BhoB3NRmEFqPgYIkjc3onzwJe%2BzAf8Mq%2B0HZ8KbtiA4UDMT4Q2F0bRZ%2BacaDUvgcKBWrJ%2FpBQTc9cK1WaPZpZeKbzSA%2FzeZu80B090vFKVfTba12Jp4AL8yJFkKvoFA5XtCQODqHbRd0mFMKWACIs86GNoiXy%2BKlpLLgPBhk%2FFHfk58hXN0cBc4yPfbC5rpx%2BRhR5%2F%2FzSF1drmrwXriZV6eb1OD4mLC%2Bt5kusawf8MeX0qhu3m1Mw6Iyz6AU6tAEm6965dkrlbHEOHVUssfMmA%2F8jR65cECOxc6LFcKsapt2AHFEf9PVHmDvFhMMjm7zVFDOhVIKMe3eMyFVXxMp1SC8q8y7lIpgmSP%2B9gpgmRKRw7r4nypMLR73SNDUVDAxSA7in2o%2FdSgaQ96TR6PK8aGWxKvAkxi%2Bmef9ULz146m4Rg1QlnOWIMHQd2lFdmnqrJ15v25HfazdGD1N%2F4pjJAa%2FNuMjPc09Q2fWk06kdsZKFhNA%3D&X-Amz-Signature=44e840d03c0ab777cb199ecde5ad757df4c09b0a0bf2e5e04473d452b848dac4&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22class-component-state.png%22)

The UI for the toggle also lives inside Layout. It implements a onClick handler which will setState for the toggle. It will also set the theme variable in local storage so that you can leave the site and come back with your preferred theme, this is also what we consider as a "side effect".

![](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/e9d6b28e-ba0c-4731-b056-bee74e84dd94/class-component-render.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIAT73L2G45JXXIHATX%2F20190621%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20190621T154305Z&X-Amz-Expires=86400&X-Amz-Security-Token=AgoJb3JpZ2luX2VjEGwaCXVzLXdlc3QtMiJGMEQCIEsMFv6ELPl1vqyQF%2Fwi7h1pq5htMtTD%2BgyTVFDNNlzHAiB%2F%2FDzLrdqvV2%2FmdGagydXNAWYEgK2XVwYh4NcPlMw0pSrjAwil%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDI3NDU2NzE0OTM3MCIM3swE9VhhZ0HRA7CWKrcD4xNU%2BjW5HukU7Jd5eGeVeF%2FTqu7BJSjbBHftgdGdZqVnVuL0EXfsyIGu5v3DSQMN9buDSaTgM3NEHXspEHPWExgm9j5V2jyZ5rGteYM0vC4jiZMz9nA7w1mAIupEjIdkISBPKW4p8UzFVHZN0gJ%2FdZMRaJrV7KlSdMSWqsgTbQ8VTfBmsL1fG2w5GJgt33f928SroDndK%2F6x5qFw%2Fn6%2F5xnRFRI0rvG7hJRxeo9sjxC%2Bv79hUANJ4vBbMC%2B51m%2FpkW5ApYrpHezDsdzHxrBmKrCkcksFVK0N1Sw8Txu%2F94RNXu2vomrU%2BKjUY%2B1hxOmwr5Z2NPIuEVeo46mtR%2BmSFahbjQya%2BooLMSZyzeuWH9j6tFgypva6YKx4TlSz0GrsT4HDncRgbUaPELFSJsJFQRo6ficzApwH%2B5BXZJQvmvZVHboDYRCDuPBsr15amiiaYD%2BSQ4bUcc8RR6fDwNc%2F3jhpGdLfzitDVYhVW69vfYAF8zEZWEeSO3GwpAXkqbya9rk%2B%2B7AHCEKgXBXhdjSA7KNei%2FzHmq%2FX3CBOlONflMF%2FTOinDbLS%2BcWveK%2BOaYuMnKnmp%2Byj2TDWkLPoBTq1Ad5eh7IZ9EOcIdaX%2FGRVnkp3AWTSrhediIOrZZ3fGVLPseUFsM2U9zGOhwSbzD1FE4%2FanKDDk4Lbuadd4e2uoRw7R24m8uAmKqAOajpOi%2FVn5m6foOc3ve4RBu9duCdPYanU2gnuC2EwnQjFTOKCqU2cRGDYKpTYfob%2BXc3IjBWzxvc7u0lV6s5Ibds0W6J7n11DIGOXsJ3bP4mWAovLVYoYIaIWIaRlHXoYN0piBw%2BFT0We6fU%3D&X-Amz-Signature=85b498af8c371f4776690bfed79c4cc2f9c1514501c8b304d7e699f57750b213&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22class-component-render.png%22)

[Use hooks for the theme toggle](https://github.com/wgao19/wgao19-cc/commit/df8f57d9ab9fbb4c9f6837dc6d43833d6b63d662)

Here is the hook. 

I call `useState` with an initial state, which computes to whether I see a local storage or not, if not, I use the default light theme.

The `useState` call returns an array which destructs to, one, a state variable, and two, a set state handler which I use to write my own `toggleTheme` handler.

Previously I write to local storage within the `setState` function. Since writing local storage is a "side effect" if you tend to be functional, we can use the `useEffect` hook to write to local storage whenever `theme` changes. This is controlled by passing in the array with variable `theme` in to the second parameter to `useEffect`. 

    const [theme, setTheme] = useState(
      typeof window !== 'undefined'
        ? window.localStorage.getItem('theme')
        : THEMES[0]
    )
    
    const toggleTheme = currentTheme => {
      const newTheme = getNewTheme(currentTheme)
      setTheme(newTheme)
    }
    
    useEffect(() => {
    	typeof window !== 'undefined' &&
        window.localStorage.setItem('theme', theme)
    }, [theme]);

[Refactor the toggle to its own component](https://github.com/wgao19/wgao19-cc/commit/fdc8d104bf07d6cc3e1195a0d4bb0bc0b590d1e3)

Next, I refactored these two pieces into its own component.

As you can see in the changes here, which is nothing more than a move around to make the Layout component a lot cleaner.

This is not yet the part that is special to hooks yet. Because we can move everything into its own component with React's class component as well.

[Refactor to custom hook](https://github.com/wgao19/wgao19-cc/commit/dfa93308c034afb9cd502137f19f0c7833dc3a7f)

This is one feature of hooks that people are excited about. 

With this refactor, we take away the logic part of the toggle into a separate file, commonly referred to as a "custom hook". I can let my custom hook return only the pieces of information it needs to share with the UI components that use it. 

In this case, we return the theme variable, and the custom toggleTheme handler that we pass to divs as onClick event.

Now that the toggle file is pretty clean. It no longer has the cryptic blocks for the hooks. And so we're left with this little block of code. I'm not sure about you but I then immediately noticed that this file is still coupled with the logic of the theme. As you may see here the class names have ternary logic that is based on whether the theme matches certain theme or not.

This wasn't so obvious earlier on when everybody lived under Layout. Now since we moved the logic out thanks to hooks, we realize that this part of the UI is still aware of the logic. Is this optimal? Not so sure. But it seems to me now that it is not too hard to optimize a little bit? I realize that the first line adds a class for the dark mode, and the second one adds a theme for the light mode. So I refactored these again (use github compare).

[](https://www.notion.so/52054c2a16de4ce1a3e2792ee7cde3a6#a609f3c85b0a4fdcade3dfa853b919e2)

Now the UI is left with only two class names describing what they are, plus two more class names that are simply the themes.

And in the CSS file? Previously the class names were semantic to what it does in terms of styling. And it's a bit hard to remember what's expanding? In what case got z index? Now the CSS says, here is your blender (we'll talk about what it is later), and here's what it looks like under the moon. And here's the toggle, and here's what it looks like under the sun.

Recap

- Toggle coupled with Layout with internal state
- Move UI to separate component with hook
- Move (again) logic to a separate file
- Cleaner cut between logic and UI

Let's take a look at what we've gone through.

First we had a Layout that had a toggle in it, and we thought it was great cuz where else should the toggle live in?

Then we moved the toggle into its own file alongside with its hook. Our Layout returns to a "dummy", functional component again, with a little toggle with a hook attached to it. 

Then, we extracted the hooks logic out again and we realize there is a more declarative way of writing our UI as well as our CSS.

## The UI

I'd like to pause here on hooks a little bit and look at the business feature we're implementing, the dark mode. 

You've already seen all the code. There is no extra colors involved. Why?

This goes back to the blending mode I talked about last month. Later on I gave another talk at SingaporeCSS with less math and more nonsense in it, [tweet](https://twitter.com/hj_chen/status/1121016994914955266). Most of us weren't there.

The idea is that there is a CSS property called `mix-blend-mode` that will ask you for a way to blend colors when graphics stack on each other. And then there is one such blending mode called `difference` that will blend the colors by taking their difference.

In CSS's standard RGB color space, white is all the light, black is zero which is synonymous to "nothing". 

diff(white, white) = white - white = 0 = black

diff(white, black) = white - black = white - 0 = white

By taking the difference of my whole site against a full-screen white-colored div, the background that used to be white becomes black, and the foreground that used to be black becomes white.

In fact, you don't have to use white as the color to compute the dark mode — in some case you shouldn't. If you take the difference of your site against the color of your background, you will preserve the original contrast between your foreground and background. And if your original background is rather light, you'll get a natural dark mode everything computed automatically.

Having this in mind, I basically just started doing this to nearly every website I visit. It's a cannot unsee situation.

So now we potentially have a magic component that can theoretically turn every website into dark mode under the moon. Basically, all we need is its background color. You can do some kind of AST traversing and get the site's background color, but how sneaky is that! We can just ask :D We're dealing with a React component and we can use props :)

    <SunMoonToggle backgroundColor="#efefef" type="hipster" />

So, I moved the component to [a package by itself and published it](https://github.com/wgao19/wgao19-cc/tree/master/plugins/sun-moon-toggle). Honestly, the building step doesn't quite work at the moment, which I'll fix over this weekend lol. But that is the inspiration brought in by hooks that I'd like to share with everyone.

Separating UI and logic helps us write more readable, declarative code.
