<script setup lang="ts">
import { useData } from "vitepress";
import { data as notes } from "./notes.data.mts";
import { onMounted, onUpdated, ref } from "vue";
import { gsap } from "gsap";

const fiveLastNotes = notes.slice(0, 4);
const email = ref("alix");
const signalLink = ref("https://signal.me/#eu/");

function animateCursor () {
    const cursor = document.querySelector('.cursor');
    const smallcursor = document.querySelector('.small-cursor');
    document.body.addEventListener('mousemove', (e) => {
        gsap.to(cursor, {
            x: e.clientX - 15,
            y: e.clientY - 15,
            duration: 0.3,
        });
        gsap.to(smallcursor, {
            x: e.clientX - 4,
            y: e.clientY - 4,
            duration: 0.1,
        });
    });
    document.body.querySelectorAll('a').forEach((link) => {
        link.addEventListener('mouseover', () => {
            gsap.to(cursor, {
                scale: 4,
                duration: 0.3,
            });
        });
        link.addEventListener('mouseleave', () => {
            gsap.to(cursor, {
                scale: 1,
                duration: 0.3,
            });
        });
    });
}

onUpdated(() => {
    animateCursor();
})

onMounted(() => {
    email.value += "@krlx.fr";
    signalLink.value +=
        "0wn5jh60ukb2FYwVgszEagpEPviB_QOzlOACzRkHrKjL1_6AAC9Mo60ZDZZ3loek";
    animateCursor();
});

// https://vitepress.dev/reference/runtime-api#usedata
const { site, frontmatter } = useData();
</script>

<style lang="css">
body {
    cursor: none;
    min-height: 100vh;
}

a {
    cursor: none;
}

/* Coffee steam animation */
.steam path {
    opacity: 0;
}

.group:hover .steam path {
    animation: steam-rise 2s ease-in-out infinite;
}

.group:hover .steam .steam-1 {
    animation-delay: 0s;
}

.group:hover .steam .steam-2 {
    animation-delay: 0.4s;
}

.group:hover .steam .steam-3 {
    animation-delay: 0.8s;
}

@keyframes steam-rise {
    0% {
        opacity: 0;
        transform: translateY(2px);
    }
    50% {
        opacity: 1;
    }
    100% {
        opacity: 0;
        transform: translateY(-8px);
    }
}
</style>

<template>
    <div>
        <div class="cursor pointer-events-none fixed top-0 left-0 w-[30px] h-[30px] rounded-full z-40 mix-blend-difference">
            <svg height="30" width="30">
                <circle cx="15" cy="15" r="12" stroke-width="0" fill="#f7f8fa"></circle>
            </svg>
        </div>
        <div class="small-cursor pointer-events-none fixed top-0 left-0 w-2 h-2 rounded-full z-50 mix-blend-difference">
            <svg height="8" width="8">
                <circle cx="5" cy="5" r="4" stroke-width="0" fill="#f7f8fa"></circle>
            </svg>
        </div>
        <div v-if="frontmatter.home">
            <div
                class="grid grid-flow-row-dense sm:auto-rows-[10rem] grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4 p-4 max-w-[1024px] mx-auto"
            >
                <div
                    class="card w-32 row-span-1 sm:w-auto sm:row-span-2 hover:shadow-xl transition-all group overflow-clip relative"
                >
                    <img
                        class="w-full h-full object-cover group-hover:brightness-90 transition-all"
                        src="/profil.jpg"
                        alt="Ma tronche et mon petit chat noir qui s'appelle Nuit"
                    />
                    <h1
                        class="absolute bottom-4 left-4 font-bold text-white transition-all translate-y-10 group-hover:-translate-y-2"
                    >
                        {{ site.title }}
                    </h1>
                </div>
                <div
                    class="card md:col-span-3 sm:col-span-2 row-span-2 hover:shadow-xl transition-all group hover:bg-gray-50"
                >
                    <div class="card-body">
                        <Content class="prose" />
                    </div>
                </div>
                <a href="/cv" class="row-span-1">
                    <div
                        class="card hover:shadow-xl transition-all group hover:bg-gray-50 h-max"
                    >
                        <div class="card-body">
                            <h2 class="card-title">Curriculum</h2>
                            <p class="group-hover:translate-x-4 transition-all">
                                Pour connaître mon parcours
                            </p>
                        </div>
                    </div>
                </a>
                <a href="/library" class="row-span-1">
                    <div
                        class="card hover:shadow-xl transition-all group hover:bg-gray-50"
                    >
                        <div class="card-body">
                            <h2 class="card-title">Bibliothèque</h2>
                            <p class="group-hover:translate-x-4 transition-all">
                                La pile à lire et quelques liens
                            </p>
                        </div>
                    </div>
                </a>
                <a href="/publications" class="row-span-1">
                    <div
                        class="card hover:shadow-xl transition-all group hover:bg-gray-50"
                    >
                        <div class="card-body">
                            <h2 class="card-title">Publications</h2>
                            <p class="group-hover:translate-x-4 transition-all">
                                Des accomplissements d'une ancienne vie
                            </p>
                        </div>
                    </div>
                </a>
                <a href="/projects" class="row-span-1">
                    <div
                        class="card hover:shadow-xl transition-all group hover:bg-gray-50"
                    >
                        <div class="card-body">
                            <h2 class="card-title">Projets</h2>
                            <p class="group-hover:translate-x-4 transition-all">
                                Certaines de mes réalisations de dev
                            </p>
                        </div>
                    </div>
                </a>
                <a href="https://hormur.com" class="row-span-1">
                    <div
                        class="card hover:shadow-xl transition-all group bg-[#f9ded7] hover:bg-white"
                    >
                        <div class="card-body">
                            <svg
                                viewBox="0 0 112 30"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                alt="Hormur logo"
                            >
                                <path
                                    d="M36.8 15C36.8 15.09 36.8 15.19 36.8 15.29V15.48C36.7283 17.4385 36.0269 19.3217 34.8 20.85L34.51 21.2C34.4619 21.2614 34.4083 21.3183 34.35 21.37C34.35 21.37 34.35 21.37 34.29 21.45L34.21 21.53L33.99 21.75L33.7 22.02C32.6562 23.0045 31.3851 23.7156 30 24.09L29.7 24.17H29.56L29.28 24.24H29.09H29L28.72 24.29C28.2329 24.3574 27.7417 24.3908 27.25 24.39H26.92C25.4171 24.3464 23.9491 23.9269 22.65 23.17L22.44 23.04L22.27 22.94L21.73 22.57C21.42 22.34 21.12 22.08 20.82 21.81C20.3418 21.3702 19.9157 20.8769 19.55 20.34H19.76C21.6088 19.9666 23.3984 19.3443 25.08 18.49C26.6111 17.7258 27.9876 16.685 29.14 15.42C29.5731 14.9419 29.9489 14.415 30.26 13.85C30.291 13.8137 30.308 13.7676 30.308 13.72C30.308 13.6723 30.291 13.6262 30.26 13.59C29.7003 12.947 29.0882 12.3516 28.43 11.81C27.2042 10.813 25.8608 9.9701 24.43 9.29997C23.2988 8.75998 22.1206 8.32483 20.91 7.99997C21.5055 7.43639 22.1791 6.96152 22.91 6.58997C24.4371 5.75393 26.1739 5.37878 27.91 5.50997C28.23 5.50997 28.54 5.56997 28.85 5.61997C29.3522 5.70904 29.847 5.83607 30.33 5.99997H30.48C31.8663 6.46576 33.1165 7.26602 34.12 8.32997L34.31 8.53997L34.43 8.67997C34.9007 9.22759 35.3161 9.82049 35.67 10.45C36.3099 11.6096 36.6824 12.8977 36.76 14.22C36.76 14.3 36.76 14.38 36.76 14.45V14.64C36.7822 14.7588 36.7956 14.8791 36.8 15Z"
                                    fill="#EE6553"
                                ></path>
                                <path
                                    d="M30.22 13.6C29.6603 12.957 29.0482 12.3616 28.39 11.82C27.1642 10.8231 25.8209 9.98013 24.39 9.31C23.2721 8.76887 22.1073 8.3304 20.91 8C19.6438 9.17273 18.7237 10.6704 18.25 12.33C18.1666 12.5673 18.1426 12.8213 18.18 13.07C18.288 13.6573 18.5918 14.1906 19.042 14.583C19.4921 14.9753 20.062 15.2034 20.6585 15.2301C21.255 15.2568 21.843 15.0805 22.3264 14.7299C22.8098 14.3794 23.16 13.8753 23.32 13.3C23.4252 12.8663 23.4252 12.4137 23.32 11.98H23.41C24.4425 12.5073 25.4234 13.13 26.34 13.84C26.46 13.93 26.43 13.97 26.34 14.05C25.4492 14.8675 24.4373 15.5422 23.34 16.05C21.7586 16.7994 20.0728 17.3052 18.34 17.55C18.23 17.55 18.23 17.61 18.26 17.69C18.29 17.77 18.35 17.96 18.39 18.09C18.6723 18.8781 19.0591 19.6248 19.54 20.31H19.75C21.5988 19.9367 23.3885 19.3143 25.07 18.46C26.6011 17.6959 27.9776 16.655 29.13 15.39C29.5631 14.912 29.9389 14.3851 30.25 13.82C30.2673 13.7845 30.2737 13.7446 30.2683 13.7055C30.263 13.6663 30.2462 13.6296 30.22 13.6ZM21.84 13.36C21.7249 13.36 21.611 13.3372 21.5047 13.2928C21.3985 13.2485 21.3022 13.1835 21.2213 13.1017C21.1403 13.0198 21.0765 12.9227 21.0333 12.816C20.9902 12.7093 20.9687 12.5951 20.97 12.48C20.9725 12.2518 21.0636 12.0335 21.2241 11.8711C21.3846 11.7088 21.6018 11.6152 21.83 11.61C21.9451 11.61 22.0591 11.6328 22.1653 11.6772C22.2715 11.7215 22.3678 11.7865 22.4487 11.8683C22.5297 11.9502 22.5935 12.0473 22.6367 12.154C22.6798 12.2607 22.7013 12.3749 22.7 12.49C22.7013 12.6038 22.6801 12.7167 22.6374 12.8222C22.5948 12.9277 22.5317 13.0237 22.4517 13.1046C22.3717 13.1855 22.2764 13.2498 22.1714 13.2936C22.0664 13.3374 21.9538 13.36 21.84 13.36Z"
                                    fill="#323242"
                                ></path>
                                <path
                                    d="M15.32 6.05989V23.9299C15.3174 23.9785 15.2963 24.0243 15.2609 24.0578C15.2256 24.0913 15.1787 24.11 15.13 24.1099H11.83C11.7823 24.1099 11.7365 24.0909 11.7027 24.0572C11.669 24.0234 11.65 23.9776 11.65 23.9299V12.6699C5.34001 15.6699 4.70001 22.7299 4.65001 23.9399C4.64505 23.9867 4.62286 24.0301 4.58775 24.0615C4.55264 24.0929 4.50712 24.1102 4.46001 24.1099H1.26001C1.23554 24.1113 1.21106 24.1076 1.18805 24.0992C1.16504 24.0907 1.144 24.0777 1.12621 24.0608C1.10842 24.044 1.09426 24.0237 1.0846 24.0012C1.07494 23.9786 1.06997 23.9544 1.07001 23.9299V6.05989C1.07001 6.03494 1.07492 6.01023 1.08447 5.98718C1.09402 5.96413 1.10801 5.94318 1.12566 5.92554C1.1433 5.9079 1.16425 5.8939 1.1873 5.88435C1.21035 5.87481 1.23506 5.86989 1.26001 5.86989H4.45001C4.49865 5.87245 4.54444 5.8936 4.57794 5.92896C4.61144 5.96431 4.63007 6.01119 4.63001 6.05989V13.9999C6.5182 11.7411 8.91794 9.96531 11.63 8.81989V6.05989C11.6299 6.01119 11.6486 5.96431 11.6821 5.92896C11.7156 5.8936 11.7614 5.87245 11.81 5.86989H15.11C15.1363 5.86854 15.1626 5.87239 15.1873 5.88122C15.2121 5.89005 15.2349 5.90367 15.2544 5.92132C15.2739 5.93897 15.2898 5.9603 15.301 5.98407C15.3123 6.00785 15.3187 6.03362 15.32 6.05989Z"
                                    fill="#323242"
                                ></path>
                                <path
                                    d="M57.32 23.9401V6.06012C57.32 6.00973 57.34 5.9614 57.3757 5.92577C57.4113 5.89014 57.4596 5.87012 57.51 5.87012H60.62C60.6556 5.87167 60.6901 5.88268 60.72 5.90201C60.7498 5.92135 60.774 5.94831 60.79 5.98012L65.79 16.4501L70.65 6.00012C70.6675 5.96951 70.692 5.94354 70.7216 5.9244C70.7512 5.90525 70.7849 5.8935 70.82 5.89012H73.94C73.9886 5.89268 74.0344 5.91382 74.0679 5.94918C74.1014 5.98454 74.1201 6.03141 74.12 6.08012V23.9401C74.1201 23.9888 74.1014 24.0357 74.0679 24.0711C74.0344 24.1064 73.9886 24.1276 73.94 24.1301H71C70.9755 24.1315 70.9511 24.1278 70.928 24.1194C70.905 24.111 70.884 24.0979 70.8662 24.0811C70.8484 24.0642 70.8343 24.0439 70.8246 24.0214C70.8149 23.9989 70.81 23.9746 70.81 23.9501V13.0001L67.22 20.0001C67.1418 20.1502 67.024 20.2761 66.8795 20.3642C66.735 20.4523 66.5692 20.4993 66.4 20.5001H65.17C64.9953 20.5011 64.8238 20.4528 64.6752 20.3609C64.5267 20.2689 64.407 20.1369 64.33 19.9801L60.65 12.4301V23.9201C60.65 23.9679 60.631 24.0136 60.5973 24.0474C60.5635 24.0812 60.5177 24.1001 60.47 24.1001H57.47C57.4309 24.0937 57.3949 24.0745 57.3678 24.0456C57.3407 24.0167 57.3239 23.9796 57.32 23.9401Z"
                                    fill="#323242"
                                ></path>
                                <path
                                    d="M85.27 24.5101C83.9403 24.5287 82.6227 24.2556 81.41 23.7101C80.2765 23.1896 79.3204 22.3482 78.66 21.2901C77.9482 20.0372 77.6018 18.6099 77.66 17.1701V6.05011C77.6599 6.0014 77.6786 5.95453 77.712 5.91917C77.7455 5.88381 77.7913 5.86267 77.84 5.86011H81C81.0486 5.86267 81.0944 5.88381 81.1279 5.91917C81.1614 5.95453 81.18 6.0014 81.18 6.05011V17.2001C81.132 17.7806 81.205 18.3647 81.3943 18.9155C81.5837 19.4663 81.8852 19.9718 82.28 20.4001C83.1525 21.0683 84.221 21.4304 85.32 21.4304C86.419 21.4304 87.4874 21.0683 88.36 20.4001C88.7565 19.9727 89.0599 19.4675 89.251 18.9167C89.4421 18.3658 89.5166 17.7813 89.47 17.2001V6.05011C89.4724 6.0005 89.4932 5.95357 89.5283 5.91845C89.5634 5.88333 89.6104 5.86253 89.66 5.86011H92.85C92.8986 5.86267 92.9444 5.88381 92.9779 5.91917C93.0114 5.95453 93.03 6.0014 93.03 6.05011V17.1701C93.1021 18.6113 92.7548 20.0424 92.03 21.2901C91.3389 22.3521 90.3563 23.1923 89.2 23.7101C87.9625 24.2555 86.6222 24.5283 85.27 24.5101Z"
                                    fill="#323242"
                                ></path>
                                <path
                                    d="M48.89 15.65C53.66 15.56 53.31 10.73 53.31 10.73C53.3014 9.68637 52.95 8.67445 52.31 7.85004C51.5411 7.00461 50.5389 6.40607 49.43 6.13004C48.0347 5.85352 46.6086 5.76606 45.19 5.87004H39.79C39.7404 5.87247 39.6934 5.89326 39.6583 5.92838C39.6232 5.9635 39.6024 6.01043 39.6 6.06004V23.93C39.6025 23.9787 39.6237 24.0245 39.659 24.058C39.6944 24.0915 39.7413 24.1101 39.79 24.11H43C43.0487 24.1101 43.0956 24.0915 43.1309 24.058C43.1663 24.0245 43.1874 23.9787 43.19 23.93V16.93C43.26 16.87 43.66 16.93 43.76 16.93C47.3 17.11 49.92 20.7 50.29 23.99C50.2972 24.0351 50.3203 24.076 50.3552 24.1054C50.3901 24.1348 50.4344 24.1506 50.48 24.15H53.57C53.5953 24.1515 53.6207 24.1476 53.6444 24.1385C53.6681 24.1295 53.6896 24.1156 53.7076 24.0976C53.7255 24.0797 53.7394 24.0581 53.7485 24.0344C53.7575 24.0107 53.7614 23.9854 53.76 23.96C52.72 16.17 48.89 15.65 48.89 15.65ZM47.47 13.65L43.17 13.57V8.79004H46.17C46.8694 8.75088 47.5708 8.81832 48.25 8.99004C48.7305 9.13966 49.1599 9.42014 49.49 9.80004C49.7826 10.1552 49.9641 10.5887 50.0116 11.0465C50.0591 11.5042 49.9706 11.9658 49.7571 12.3735C49.5437 12.7812 49.2148 13.1169 48.8115 13.3386C48.4083 13.5603 47.9486 13.6582 47.49 13.62L47.47 13.65Z"
                                    fill="#323242"
                                ></path>
                                <path
                                    d="M106.08 15.65C110.85 15.56 110.5 10.73 110.5 10.73C110.495 9.68573 110.143 8.67263 109.5 7.85004C108.737 7.00251 107.737 6.40336 106.63 6.13004C105.235 5.85352 103.809 5.76606 102.39 5.87004H97C96.9496 5.87004 96.9013 5.89006 96.8656 5.92569C96.83 5.96132 96.81 6.00965 96.81 6.06004V23.93C96.81 23.9545 96.8149 23.9788 96.8246 24.0013C96.8343 24.0238 96.8484 24.0441 96.8662 24.061C96.884 24.0778 96.905 24.0909 96.928 24.0993C96.951 24.1078 96.9755 24.1114 97 24.11H100.19C100.238 24.11 100.284 24.0911 100.317 24.0573C100.351 24.0236 100.37 23.9778 100.37 23.93V16.93C100.44 16.87 100.85 16.93 100.94 16.93C104.49 17.11 107.1 20.7 107.48 23.99C107.485 24.0342 107.506 24.075 107.539 24.1046C107.573 24.1341 107.616 24.1503 107.66 24.15H110.76C110.785 24.1515 110.811 24.1476 110.834 24.1385C110.858 24.1295 110.88 24.1156 110.898 24.0976C110.916 24.0797 110.929 24.0581 110.938 24.0344C110.948 24.0107 110.951 23.9854 110.95 23.96C109.91 16.17 106.08 15.65 106.08 15.65ZM104.66 13.65L100.35 13.57V8.79004H103.35C104.049 8.75135 104.751 8.81878 105.43 8.99004C105.911 9.13966 106.34 9.42014 106.67 9.80004C106.963 10.1552 107.144 10.5887 107.192 11.0465C107.239 11.5042 107.151 11.9658 106.937 12.3735C106.724 12.7812 106.395 13.1169 105.992 13.3386C105.588 13.5603 105.129 13.6582 104.67 13.62L104.66 13.65Z"
                                    fill="#323242"
                                ></path>
                                <path
                                    d="M36.8 14.9999C36.8 15.0899 36.8 15.1899 36.8 15.2899V15.4799C36.7006 17.4328 36.0023 19.3078 34.8 20.8499L34.51 21.1999C34.4619 21.2613 34.4083 21.3182 34.35 21.3699C34.3087 21.4277 34.2618 21.4813 34.21 21.5299L33.99 21.7499L33.7 22.0199C32.641 22.9835 31.3753 23.6916 30 24.0899L29.7 24.1699H29.56L29.28 24.2399H29.09H29C28.4457 24.3412 27.8834 24.3914 27.32 24.3899H26.92C25.4195 24.3313 23.955 23.9128 22.65 23.1699L22.44 23.0399L22.27 22.9399L21.73 22.5699C22.2134 22.6417 22.7013 22.6784 23.19 22.6799C25.1711 22.664 27.0975 22.0277 28.6985 20.8606C30.2994 19.6934 31.4945 18.054 32.1157 16.1727C32.7369 14.2914 32.7531 12.2627 32.162 10.3717C31.5708 8.4807 30.4021 6.82243 28.82 5.62988C29.3321 5.7142 29.8369 5.8379 30.33 5.99988H30.48C31.8553 6.48851 33.1004 7.28554 34.12 8.32988L34.31 8.53988L34.43 8.67988C34.9091 9.22096 35.3251 9.81477 35.67 10.4499C36.3278 11.6855 36.7035 13.0516 36.77 14.4499V14.6399C36.7889 14.759 36.7989 14.8793 36.8 14.9999Z"
                                    fill="#EE7951"
                                ></path>
                            </svg>
                        </div>
                    </div>
                </a>
                <a href="https://www.kronikle.eu" class="row-span-1">
                    <div
                        class="card hover:shadow-xl transition-all group overflow-clip border border-gray-100 hover:border-gray-200"
                    >
                        <div class="card-body">
                            <img
                                src="/icons/kronikle.png"
                                alt="Kronikle logo"
                                class="h-12 w-12"
                            />
                            <h2
                                class="absolute right-8 top-1/2 card-title translate-x-60 group-hover:translate-x-0 transition-all"
                            >
                                Kronikle
                            </h2>
                        </div>
                    </div>
                </a>
                <a href="https://mytinycafe.com" class="row-span-1">
                    <div
                        class="card hover:shadow-xl transition-all group overflow-clip bg-[#8B6F47] hover:bg-[#6F5435]"
                    >
                        <div class="card-body flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-coffee">
                                <path d="M10 2v2" class="steam steam-2"/>
                                <path d="M14 2v2" class="steam steam-3"/>
                                <path d="M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 0 1 1 0 8h-1"/>
                                <path d="M6 2v2" class="steam steam-1"/>
                            </svg>
                        </div>
                    </div>
                </a>
                <div
                    class="card hover:shadow-xl transition-all group hover:bg-gray-50"
                >
                    <div
                        class="card-body grid grid-cols-2 grid-rows-2 place-items-center"
                    >
                        <a href="https://github.com/Karalix">
                            <div
                                class="card card-compact w-12 h-12 hover:bg-gray-100 hover:shadow-md p-3 hover:rotate-12"
                            >
                                <img
                                    src="/icons/icons8-GitHub.png"
                                    alt="Mon profil github"
                                />
                            </div>
                        </a>
                        <a href="https://linkedin.com/in/alixducros">
                            <div
                                class="card card-compact w-12 h-12 hover:bg-gray-100 hover:shadow-md p-3 hover:rotate-3"
                            >
                                <img
                                    src="/icons/icons8-LinkedIn.png"
                                    alt="Mon profil Linkedin"
                                />
                            </div>
                        </a>
                        <a
                            href="https://hal.archives-ouvertes.fr/search/index/q/*/authIdHal_s/alix-ducros"
                        >
                            <div
                                class="card card-compact w-12 h-12 hover:bg-gray-100 hover:shadow-md p-3 hover:-rotate-3"
                            >
                                <img
                                    src="/icons/icons8-test-tube-64.png"
                                    alt="Ma page HAL"
                                />
                            </div>
                        </a>
                        <a href="https://bagarrosphere.fr/@krlx">
                            <div
                                class="card card-compact w-12 h-12 hover:bg-gray-100 hover:shadow-md p-3 hover:-rotate-6"
                            >
                                <img
                                    src="/icons/mastodon.png"
                                    alt="Mon profil Mastodon"
                                />
                            </div>
                        </a>
                    </div>
                </div>
                <a href="/notes" class="sm:row-span-2 sm:col-span-2">
                    <div
                        class="card hover:shadow-xl transition-all group hover:bg-gray-50"
                    >
                        <div class="card-body">
                            <h2 class="card-title">Notes</h2>
                            <div
                                class="prose group-hover:translate-x-4 transition-all"
                            >
                                <ul>
                                    <li v-for="note of fiveLastNotes">
                                        <a
                                            :href="note.url"
                                            class="no-underline hover:font-bold"
                                            >{{ note.title }}</a
                                        >
                                    </li>
                                    <li>...</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </a>
                <div
                    class="card hover:shadow-xl transition-all group hover:bg-gray-50"
                >
                    <div class="card-body">
                        <h2 class="card-title">Contactez-moi</h2>
                        <a
                            :href="`mailto:${email}`"
                            class="group-hover:translate-x-4 transition-all hover:font-bold"
                            >{{ email }}</a
                        >
                        <a
                            :href="signalLink"
                            class="group-hover:translate-x-4 transition-all hover:font-bold"
                            >Signal</a
                        >
                    </div>
                </div>
            </div>
        </div>
        <div v-else>
            <a class="btn cursor-none fixed left-8 bottom-8 sm:top-8 z-20" href="/">Retour à l'accueil</a>
        </div>
        <div v-if="frontmatter.notelist">
            <div class="prose mx-auto p-4 my-12">
                <ul>
                    <li v-for="note of notes" :key="note.url">
                        <a :href="note.url"
                            >{{ note.title }} - {{ note.date.string }}</a
                        >
                    </li>
                </ul>
            </div>
        </div>
        <div v-if="frontmatter.layout === 'page'">
            <div class="prose mx-auto p-4 my-12">
                <Content />
            </div>
        </div>
        <div v-if="frontmatter.layout === 'article'">
            <div class="prose mx-auto p-4 my-12">
                <Content />
                <div class="my-8 flex flex-row items-center space-x-4">
                    <img
                        class="w-28 h-28 rounded-full object-cover brightness-90 transition-all"
                        src="/profil.jpg"
                        alt="Ma tronche et mon petit chat noir qui s'appelle Nuit"
                    />
                    <div class="text-sm">
                        Écrit par <a href="/">Alix Ducros</a> le {{ frontmatter.date }}<br />
                        Développement Web, recherche UX, design ludique ou cuisine, n'hésitez pas à me contacter pour discuter de vos projets ou de vos idées.
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>