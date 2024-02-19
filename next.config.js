/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
}
module.exports = {
  images: {
    domains: ['lh3.googleusercontent.com'], // 여기에 사용하는 호스트네임 추가
  },
};
