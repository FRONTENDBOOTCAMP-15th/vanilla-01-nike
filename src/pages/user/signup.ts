import { createUserApi } from '../../apis/user.ts';
import type { UserType } from '../../types/user';

/**
 * 회원가입을 처리하는 함수
 * 폼 데이터에서 사용자 정보를 추출하고, 프로필 이미지가 있으면 업로드한 후
 * 사용자 생성 API를 호출합니다. 회원가입이 성공하면 메인 페이지로 이동합니다.
 *
 * @async
 * @function signup
 * @param {HTMLFormElement} formElement - 회원가입 폼 요소
 * @returns {Promise<void>}
 */
async function signup(formElement: HTMLFormElement) {
  const formData = new FormData(formElement);
  const urlParams = new URLSearchParams(location.search);
  const email = urlParams.get('email');

  if (!email) {
    alert('잘못된 접근입니다. 이메일 정보가 없습니다.');
    return;
  }

  const user = {
    type: (formData.get('type') || 'user') as UserType,
    email,
    name: formData.get('name') as string,
    password: formData.get('password') as string,
  };

  const userData = await createUserApi(user);

  if (userData?.ok) {
    alert('회원가입이 완료되었습니다.');
    location.href = '/';
  }
}

/**
 * 폼 제출 이벤트를 처리하는 함수
 * 기본 제출 동작을 방지하고, 폼 데이터를 검증한 후
 * 검증이 통과하면 signup 함수를 호출하여 회원가입을 진행합니다.
 *
 * @async
 * @function handleSubmit
 * @param {Event} event - 폼 제출 이벤트 객체
 * @returns {Promise<void>}
 */
async function handleSubmit(event: Event) {
  event.preventDefault();
  const formElement = event.target as HTMLFormElement;

  const isValid = validateForm(formElement);

  if (!isValid) return;
  console.log('폼 검증 통과, 회원가입 진행');
  await signup(formElement);
}

/**
 * 폼 데이터 검증 함수
 * 이름, 이메일, 비밀번호 필드의 필수 입력 여부를 검증하고,
 * 검증 실패 시 오류 메시지를 표시합니다.
 *
 * @function validateForm
 * @param {HTMLFormElement} formElement - 검증할 폼 요소
 * @returns {boolean} - 검증 통과 여부 (true: 통과, false: 실패)
 */
function validateForm(formElement: HTMLFormElement) {
  let result = true;

  const name =
    formElement.querySelector<HTMLInputElement>('input[name="name"]')!;
  const firstname = formElement.querySelector<HTMLInputElement>(
    'input[name="firstName"]',
  )!;
  const password = formElement.querySelector<HTMLInputElement>(
    'input[name="password"]',
  )!;
  const agree = formElement.querySelector<HTMLInputElement>(
    'input[type="checkbox"]',
  )!;

  // 이름 체크
  if (name.value.trim() === '') {
    name.nextElementSibling!.textContent = '이름은 필수입니다.';
    result = false;
  } else {
    name.nextElementSibling!.textContent = '';
  }

  // 성 체크
  if (firstname.value.trim() === '') {
    firstname.nextElementSibling!.textContent = '성은 필수입니다.';
    result = false;
  } else {
    firstname.nextElementSibling!.textContent = '';
  }

  // 비밀번호 체크
  if (password.value.trim() === '') {
    password.nextElementSibling!.textContent = '비밀번호는 필수입니다.';
    result = false;
  } else {
    password.nextElementSibling!.textContent = '';
  }

  // 필수 작성사항 및 체크박스 체크 여부
  if (name.value.trim() === '' || password.value.trim() === '') {
    alert('필수 작성사항을 모두 입력해주세요.');
    result = false;
  } else if (!agree.checked) {
    alert('약관에 동의해야 회원가입이 가능합니다.');
    result = false;
  }

  return result;
}

// 정규식
const regEight = /^.{8,}$/;
const regMin = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;

// DOM 변수
const userPwInput = document.getElementById('pw') as HTMLInputElement;
const loginTxtFirst = document.getElementById('loginTxtFirst') as HTMLElement;
const loginTxtSecond = document.getElementById('loginTxtSecond') as HTMLElement;

function regPassword(pw: string) {
  if (pw === '') {
    loginTxtFirst.innerHTML = `<p style="color:var(--color-gray-500)">X 최소 8자 이상</p>`;
    loginTxtSecond.innerHTML =
      '<p style="color:var(--color-gray-500)">X 알파벳 대문자 및 소문자 조합, 최소 1개 이상의 숫자</p>';
  } else if (!regEight.test(pw)) {
    loginTxtFirst.innerHTML = '<p style="color: red">X 최소 8자 이상 </p>';
    loginTxtSecond.innerHTML =
      '<p style="color: red">X 알파벳 대문자 및 소문자 조합, 최소 1개 이상의 숫자</p>';
  } else if (!regMin.test(pw)) {
    loginTxtFirst.innerHTML =
      '<p style="color: var(--color-green-600)">V 최소 8자 이상 </p>';
    loginTxtSecond.innerHTML =
      '<p style="color: red">X 알파벳 대문자 및 소문자 조합, 최소 1개 이상의 숫자</p>';
  } else {
    loginTxtFirst.innerHTML =
      '<p style="color: var(--color-green-600)">V 최소 8자 이상 </p>';
    loginTxtSecond.innerHTML =
      '<p style="color: var(--color-green-600)">V 알파벳 대문자 및 소문자 조합, 최소 1개 이상의 숫자</p>';
  }
}

// 입력 시 실시간 체크
userPwInput.addEventListener('input', () => {
  const pw = userPwInput.value;
  regPassword(pw);
});

document
  .querySelector('#signup-form')
  ?.addEventListener('submit', handleSubmit);

document.querySelector('#userCreateBtn')?.addEventListener('click', () => {
  regPassword(userPwInput.value);
});
