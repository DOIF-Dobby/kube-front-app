import { myAxios } from "@/libs/axios-instance";
import { AxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";

/**
 * NextRequest에서 headers를 추출
 */
export function getHeaders(request: NextRequest) {
  const headers: { [key: string]: string } = {};

  request.headers.forEach((value, key) => {
    headers[key] = value;
  });

  return headers;
}

/**
 * NextRequest에서 uri를 추출
 */
export function getApiUri(request: NextRequest) {
  const { pathname } = request.nextUrl;
  return pathname.startsWith("/api") ? pathname.replace("/api", "") : pathname;
}

/**
 * POST 요청
 */
export async function POST(request: NextRequest) {
  const uri = getApiUri(request);
  const headers = getHeaders(request);
  const body = await request.json();

  try {
    const response = await myAxios.post(uri, body, {
      headers,
    });

    return NextResponse.json(response.data, { status: response.status });
  } catch (error) {
    const axiosError = error as AxiosError;

    return NextResponse.json(axiosError.response?.data, {
      status: axiosError.response?.status,
    });
  }
}

/**
 * GET 요청
 */
export async function GET(request: NextRequest) {
  const uri = getApiUri(request);
  const headers = getHeaders(request);

  try {
    const response = await myAxios.get(uri, {
      params: request.nextUrl.searchParams,
      headers,
    });

    return NextResponse.json(response.data, { status: response.status });
  } catch (error) {
    const axiosError = error as AxiosError;

    return NextResponse.json(axiosError.response?.data, {
      status: axiosError.response?.status,
    });
  }
}

/**
 * PUT 요청
 */
export async function PUT(request: NextRequest) {
  const uri = getApiUri(request);
  const headers = getHeaders(request);
  const body = await request.json();

  try {
    const response = await myAxios.put(uri, body, {
      params: request.nextUrl.searchParams,
      headers,
    });

    return NextResponse.json(response.data, { status: response.status });
  } catch (error) {
    const axiosError = error as AxiosError;

    return NextResponse.json(axiosError.response?.data, {
      status: axiosError.response?.status,
    });
  }
}

/**
 * DELETE 요청
 */
export async function DELETE(request: NextRequest) {
  const uri = getApiUri(request);
  const headers = getHeaders(request);
  const body = await request.json();

  try {
    const response = await myAxios.delete(uri, {
      params: request.nextUrl.searchParams,
      headers,
      data: body,
    });

    return NextResponse.json(response.data, { status: response.status });
  } catch (error) {
    const axiosError = error as AxiosError;

    return NextResponse.json(axiosError.response?.data, {
      status: axiosError.response?.status,
    });
  }
}
