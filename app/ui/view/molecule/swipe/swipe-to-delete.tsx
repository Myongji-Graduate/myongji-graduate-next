'use client';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import './swipe-to-delete.css';

export interface Props {
  onDelete?: any;
  onDeleteConfirm?: Function;
  disabled?: boolean;
  height?: number;
  transitionDuration?: number;
  deleteWidth?: number;
  deleteThreshold?: number;
  showDeleteAction?: boolean;
  deleteColor?: string;
  deleteText?: string;
  className?: string;
  id?: string;
  rtl?: boolean;
  children?: React.ReactNode;
  onSwipeAction: VoidFunction;
}

const cursorPosition = (event: any) => {
  if (event?.touches?.[0]?.clientX) return event.touches[0].clientX;
  if (event?.clientX) return event?.clientX;
  if (event?.nativeEvent?.touches?.[0]?.clientX) return event.nativeEvent.touches[0].clientX;
  return event?.nativeEvent?.clientX;
};

const SwipeToDelete = ({
  onDelete,
  onDeleteConfirm,
  disabled = false,
  height = 50,
  transitionDuration = 250,
  deleteWidth = 75,
  deleteThreshold = 75,
  showDeleteAction = true,
  deleteColor = 'rgba(252, 58, 48, 1.00)',
  deleteText = 'Delete',
  className = '',
  id = '',
  rtl = false,
  onSwipeAction,
  children,
}: Props) => {
  const [touching, setTouching] = useState(false);
  const [translate, setTranslate] = useState(0);
  const [deleting, setDeleting] = useState(false);

  const startTouchPosition = useRef(0);
  const initTranslate = useRef(0);
  const container = useRef<HTMLDivElement>(null);
  const containerWidth: number = container.current?.getBoundingClientRect().width || 0;
  const deleteWithoutConfirmThreshold: number = containerWidth * (deleteThreshold / 100);

  const onStart = useCallback(
    (event: React.TouchEvent | React.MouseEvent) => {
      if (disabled) return;
      if (touching) return;
      startTouchPosition.current = cursorPosition(event);
      initTranslate.current = translate;
      setTouching(true);
    },
    [disabled, touching, translate],
  );

  useEffect(() => {
    const root = container.current;
    root?.style.setProperty('--rstdiHeight', height + 'px');
    root?.style.setProperty('--rstdiTransitionDuration', transitionDuration + 'ms');
    root?.style.setProperty('--rstdiIsRtl', rtl ? '1' : '-1');
    root?.style.setProperty('--rstdiDeleteColor', deleteColor);
    root?.style.setProperty('--rstdiDeleteWidth', deleteWidth + 'px');
  }, [deleteColor, deleteWidth, height, rtl, transitionDuration]);

  useEffect(() => {
    const root = container.current;
    root?.style.setProperty('--rstdiTranslate', translate * (rtl ? -1 : 1) + 'px');
    const shiftDelete = -translate >= deleteWithoutConfirmThreshold;
    root?.style.setProperty(
      `--rstdiButtonMargin${rtl ? 'Right' : 'Left'}`,
      (shiftDelete ? containerWidth + translate : containerWidth - deleteWidth) + 'px',
    );
  }, [translate, deleteWidth, containerWidth, rtl, deleteWithoutConfirmThreshold]);

  const onMove = useCallback(
    function (event: TouchEvent | MouseEvent) {
      if (!touching) return;
      if (!rtl && cursorPosition(event) > startTouchPosition.current - initTranslate.current) return setTranslate(0);
      if (rtl && cursorPosition(event) < startTouchPosition.current - initTranslate.current) return setTranslate(0);
      setTranslate(cursorPosition(event) - startTouchPosition.current + initTranslate.current);
    },
    [rtl, touching],
  );

  const onMouseMove = useCallback(
    function (event: MouseEvent): any {
      onMove(event);
    },
    [onMove],
  );

  const onTouchMove = useCallback(
    function (event: TouchEvent): any {
      onMove(event);
    },
    [onMove],
  );

  const onDeleteConfirmed = useCallback(() => {
    window.setTimeout(onDelete, transitionDuration);
  }, [onDelete, transitionDuration]);

  const onDeleteCancel = useCallback(() => {
    setTouching(() => false);
    setTranslate(() => 0);
    setDeleting(() => false);
    startTouchPosition.current = 0;
    initTranslate.current = 0;
  }, [onDelete, transitionDuration]);

  const onDeleteClick = useCallback(() => {
    if (onDeleteConfirm) {
      onDeleteConfirm(onDeleteConfirmed, onDeleteCancel);
    } else {
      onDeleteConfirmed();
    }
  }, [, onDeleteConfirmed]);

  const onMouseUp = useCallback(
    function () {
      startTouchPosition.current = 0;
      const acceptableMove = -deleteWidth * 0.7;
      const showDelete = showDeleteAction ? (rtl ? -1 : 1) * translate < acceptableMove : false;
      const notShowDelete = showDeleteAction ? (rtl ? -1 : 1) * translate >= acceptableMove : true;
      const deleteWithoutConfirm = (rtl ? 1 : -1) * translate >= deleteWithoutConfirmThreshold;
      if (deleteWithoutConfirm) {
        setTranslate(() => -containerWidth);
      } else if (notShowDelete) {
        setTranslate(() => 0);
      } else if (showDelete && !deleteWithoutConfirm) {
        setTranslate(() => (rtl ? 1 : -1) * deleteWidth);
      }
      setTouching(() => false);
      if (deleteWithoutConfirm) onDeleteClick();
    },
    [containerWidth, deleteWidth, deleteWithoutConfirmThreshold, onDeleteClick, rtl, translate],
  );

  useEffect(() => {
    if (touching) {
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('touchmove', onTouchMove);
      window.addEventListener('mouseup', onMouseUp);
      window.addEventListener('touchend', onMouseUp);
    } else {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('touchend', onMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('touchend', onMouseUp);
    };
  }, [onMouseMove, onMouseUp, onTouchMove, touching]);

  return (
    <form
      action={() => {
        onSwipeAction();
      }}
    >
      <div id={id} className={`rstdi${deleting ? ' deleting' : ''} ${className}`} ref={container}>
        <div className={`delete${deleting ? ' deleting' : ''}`}>
          <button
            onClick={() => {
              setTranslate(0);
            }}
          >
            삭제
          </button>
        </div>
        <div
          className={`content${deleting ? ' deleting' : ''}${!touching ? ' transition' : ''}`}
          onMouseDown={onStart}
          onTouchStart={onStart}
        >
          <div className="bg-white rounded-xl">{children}</div>
        </div>
      </div>
    </form>
  );
};

export default SwipeToDelete;
