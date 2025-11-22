import { getPostApi } from '../../apis/post';
import type { Post } from '../../types/post';

/**
 * 게시글 상세 정보를 조회하고 렌더링하는 함수
 * URL 쿼리 파라미터에서 id를 가져와 해당 게시글의 상세 정보를 조회하고 표시합니다.
 *
 * @async
 * @function detailView
 * @returns {Promise<void>}
 */
async function detailView() {
  const id = new URLSearchParams(window.location.search).get('id');
  if (id) {
    const data = await getPostApi(id);
    if (data?.ok) {
      render(data.item);
    }
  }
}

/**
 * 게시글 상세 정보를 DOM에 렌더링하는 함수
 * Post 객체를 받아서 제목, 작성자명, 수정일시, 내용을 각각의 DOM 요소에 삽입합니다.
 *
 * @function render
 * @param {Post} post - 렌더링할 게시글 객체
 * @returns {void}
 */
function render(post: Post) {
  document.querySelector('#title')!.innerHTML = post.title;
  document.querySelector('#user-name')!.innerHTML = post.user.name;
  document.querySelector('#updated-at')!.innerHTML = post.updatedAt;
  document.querySelector('#content > p')!.innerHTML = post.content;
}

detailView();
