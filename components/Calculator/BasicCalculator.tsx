'use client';

import { useState, useEffect } from 'react';
import { calculate } from '@/lib/utils';

type Operator = '+' | '-' | '×' | '÷' | '%' | null;
type CalculationHistory = {
  id: string;
  expression: string;
  result: string;
  note?: string;
};

export function BasicCalculator() {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState('');
  const [operator, setOperator] = useState<Operator>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [history, setHistory] = useState<CalculationHistory[]>([]);
  const [isScientific, setIsScientific] = useState(false);
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [tempNote, setTempNote] = useState('');

  // Keyboard support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (editingNoteId) return;
      
      const key = e.key;

      if (key >= '0' && key <= '9') {
        inputNumber(key);
      } else if (key === '+') inputOperator('+');
      else if (key === '-') inputOperator('-');
      else if (key === '*') inputOperator('×');
      else if (key === '/') {
        e.preventDefault();
        inputOperator('÷');
      } else if (key === '%') inputOperator('%');
      else if (key === '.') inputDecimal();
      else if (key === 'Enter' || key === '=') {
        e.preventDefault();
        performCalculation();
      } else if (key === 'Escape' || key?.toLowerCase() === 'c') {
        clearAll();
      } else if (key === 'Backspace') {
        handleBackspace();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [display, previousValue, operator, waitingForOperand, editingNoteId]);

  const inputNumber = (num: string) => {
    if (waitingForOperand) {
      if (operator === null) {
        // 刚计算完结果，开始新的计算
      setDisplay(num);
      } else {
        // 刚输入运算符，追加到表达式
        setDisplay(display + num);
      }
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      if (operator === null) {
        // 刚计算完结果，开始新的小数
      setDisplay('0.');
      } else {
        // 刚输入运算符，追加小数
        setDisplay(display + '0.');
      }
      setWaitingForOperand(false);
    } else {
      // 检查当前数字部分是否已经有小数点
      const parts = display.split(' ');
      const lastPart = parts[parts.length - 1];
      if (!lastPart.includes('.')) {
      setDisplay(display + '.');
      }
    }
  };

  const inputOperator = (nextOperator: Operator) => {
    // 特殊处理：减号可以作为负号
    if (nextOperator === '-') {
      // 情况1: 初始状态，输入负号
      if (display === '0') {
        setDisplay('-');
        setWaitingForOperand(false);
        return;
      }
      
      // 情况2: 刚输入完运算符，输入负号（如 "7 + " 后按 -）
      if (waitingForOperand && operator !== null) {
        setDisplay(display + '-');
        setWaitingForOperand(false);
        return;
      }
    }
    
    if (previousValue === '') {
    setPreviousValue(display);
      setDisplay(display + ' ' + nextOperator + ' ');
    } else if (operator && !waitingForOperand) {
      // 连续计算
      const currentValue = parseFloat(display.split(' ').pop() || '0');
      const newValue = calculate(parseFloat(previousValue), currentValue, operator);
      setPreviousValue(String(newValue));
      setDisplay(String(newValue) + ' ' + nextOperator + ' ');
    } else {
      // 替换运算符
      const parts = display.split(' ');
      const lastPart = parts[parts.length - 1];
      if (lastPart === '') {
        parts[parts.length - 2] = nextOperator || '';
        setDisplay(parts.join(' '));
      } else {
        setDisplay(display + ' ' + nextOperator + ' ');
      }
    }

    setWaitingForOperand(true);
    setOperator(nextOperator);
  };

  const performCalculation = () => {
    if (operator === null || previousValue === '') return;

    try {
      const parts = display.split(' ');
      const lastPart = parts[parts.length - 1];
      
      // 如果最后是空的（用户只输入了运算符），不计算
      if (lastPart === '' || lastPart === undefined) {
        return;
      }
      
      const currentValue = parseFloat(lastPart);
      
      // 检查是否为有效数字
      if (isNaN(currentValue)) {
        setDisplay('Error');
        setWaitingForOperand(true);
        return;
      }
      
      const result = calculate(parseFloat(previousValue), currentValue, operator);
      
      const newHistory: CalculationHistory = {
        id: Date.now().toString(),
        expression: display,
        result: result.toString(),
      };
      setHistory([newHistory, ...history].slice(0, 20));
      
      setDisplay(result.toString());
      setOperator(null);
      setPreviousValue('');
      setWaitingForOperand(true);
    } catch (error) {
      setDisplay('Error');
      setWaitingForOperand(true);
    }
  };

  const clearAll = () => {
    setDisplay('0');
    setPreviousValue('');
    setOperator(null);
    setWaitingForOperand(false);
  };

  const clearHistory = () => {
    setHistory([]);
  };

  const deleteHistoryItem = (id: string) => {
    setHistory(history.filter(item => item.id !== id));
  };

  const toggleSign = () => {
    // 只在纯数字状态下才能使用
    const parts = display.split(' ');
    const lastPart = parts[parts.length - 1];
    
    // 如果是纯数字
    if (parts.length === 1) {
      const num = parseFloat(display);
      if (!isNaN(num)) {
        setDisplay((num * -1).toString());
      }
    } 
    // 如果在表达式中，切换最后输入的数字
    else if (lastPart && lastPart !== '' && !isNaN(parseFloat(lastPart))) {
      const num = parseFloat(lastPart);
      parts[parts.length - 1] = (num * -1).toString();
      setDisplay(parts.join(' '));
    }
  };

  const handleBackspace = () => {
    // 如果只有一个字符或者是 '0'，重置为 '0'
    if (display.length === 1 || display === '0') {
      setDisplay('0');
      return;
    }
    
    const newDisplay = display.slice(0, -1);
    
    // 检查删除后的状态
    const lastChar = newDisplay[newDisplay.length - 1];
    
    // 如果删除后以空格结尾，再删除一个字符（删除空格）
    if (lastChar === ' ') {
      const trimmed = newDisplay.slice(0, -1);
      
      // 如果删除空格后又是空格，继续删除（删除运算符）
      if (trimmed[trimmed.length - 1] === ' ') {
        const finalDisplay = trimmed.slice(0, -1);
        setDisplay(finalDisplay || '0');
        setOperator(null);
        setWaitingForOperand(false);
        return;
      }
      
      setDisplay(trimmed || '0');
      return;
    }
    
    setDisplay(newDisplay || '0');
  };

  const handleScientific = (func: string) => {
    // 获取当前应该处理的数字
    let num: number;
    const parts = display.split(' ');
    const lastPart = parts[parts.length - 1];
    
    // 如果最后一部分是空的或有运算符，使用 display 整体
    if (lastPart === '' || parts.length > 1) {
      // 如果在表达式中间，只处理最后的数字
      if (lastPart && lastPart !== '') {
        num = parseFloat(lastPart);
      } else {
        // 如果刚输入运算符，不处理
        return;
      }
    } else {
      num = parseFloat(display);
    }
    
    // 检查是否为有效数字
    if (isNaN(num)) return;
    
    let result: number;
    let expression: string;
    
    switch (func) {
      case 'sin':
        result = Math.sin(num * Math.PI / 180);
        expression = `sin(${num})`;
        break;
      case 'cos':
        result = Math.cos(num * Math.PI / 180);
        expression = `cos(${num})`;
        break;
      case 'tan':
        result = Math.tan(num * Math.PI / 180);
        expression = `tan(${num})`;
        break;
      case 'ln':
        if (num <= 0) {
          setDisplay('Error');
          return;
        }
        result = Math.log(num);
        expression = `ln(${num})`;
        break;
      case 'log':
        if (num <= 0) {
          setDisplay('Error');
          return;
        }
        result = Math.log10(num);
        expression = `log(${num})`;
        break;
      case 'sqrt':
        if (num < 0) {
          setDisplay('Error');
          return;
        }
        result = Math.sqrt(num);
        expression = `√(${num})`;
        break;
      case 'square':
        result = num * num;
        expression = `${num}²`;
        break;
      case 'cube':
        result = num * num * num;
        expression = `${num}³`;
        break;
      case 'inverse':
        if (num === 0) {
          setDisplay('Error');
          return;
        }
        result = 1 / num;
        expression = `1/${num}`;
        break;
      case 'pi':
        result = Math.PI;
        expression = 'π';
        break;
      case 'e':
        result = Math.E;
        expression = 'e';
        break;
      default:
        return;
    }
    
    // 添加到历史记录
    const newHistory: CalculationHistory = {
      id: Date.now().toString(),
      expression: expression,
      result: result.toString(),
    };
    setHistory([newHistory, ...history].slice(0, 20));
    
    setDisplay(result.toString());
    setOperator(null);
    setPreviousValue('');
    setWaitingForOperand(true);
  };

  const startEditNote = (id: string, currentNote: string = '') => {
    setEditingNoteId(id);
    setTempNote(currentNote);
  };

  const saveNote = (id: string) => {
    setHistory(history.map(item => 
      item.id === id ? { ...item, note: tempNote.trim() || undefined } : item
    ));
    setEditingNoteId(null);
    setTempNote('');
  };

  const cancelEditNote = () => {
    setEditingNoteId(null);
    setTempNote('');
  };

  const basicButtons = [
    { label: 'C', onClick: clearAll, className: 'bg-gray-300 hover:bg-gray-400 text-gray-900' },
    { label: '⌫', onClick: handleBackspace, className: 'bg-gray-300 hover:bg-gray-400 text-gray-900' },
    { label: '%', onClick: () => inputOperator('%'), className: 'bg-gray-300 hover:bg-gray-400 text-gray-900' },
    { label: '÷', onClick: () => inputOperator('÷'), className: 'bg-orange-500 hover:bg-orange-600 text-white' },
    
    { label: '7', onClick: () => inputNumber('7'), className: 'bg-gray-700 hover:bg-gray-600 text-white' },
    { label: '8', onClick: () => inputNumber('8'), className: 'bg-gray-700 hover:bg-gray-600 text-white' },
    { label: '9', onClick: () => inputNumber('9'), className: 'bg-gray-700 hover:bg-gray-600 text-white' },
    { label: '×', onClick: () => inputOperator('×'), className: 'bg-orange-500 hover:bg-orange-600 text-white' },
    
    { label: '4', onClick: () => inputNumber('4'), className: 'bg-gray-700 hover:bg-gray-600 text-white' },
    { label: '5', onClick: () => inputNumber('5'), className: 'bg-gray-700 hover:bg-gray-600 text-white' },
    { label: '6', onClick: () => inputNumber('6'), className: 'bg-gray-700 hover:bg-gray-600 text-white' },
    { label: '−', onClick: () => inputOperator('-'), className: 'bg-orange-500 hover:bg-orange-600 text-white' },
    
    { label: '1', onClick: () => inputNumber('1'), className: 'bg-gray-700 hover:bg-gray-600 text-white' },
    { label: '2', onClick: () => inputNumber('2'), className: 'bg-gray-700 hover:bg-gray-600 text-white' },
    { label: '3', onClick: () => inputNumber('3'), className: 'bg-gray-700 hover:bg-gray-600 text-white' },
    { label: '+', onClick: () => inputOperator('+'), className: 'bg-orange-500 hover:bg-orange-600 text-white' },
  ];

  const scientificButtons = [
    { label: 'sin', onClick: () => handleScientific('sin'), className: 'bg-gray-600 hover:bg-gray-500 text-white text-xs' },
    { label: 'cos', onClick: () => handleScientific('cos'), className: 'bg-gray-600 hover:bg-gray-500 text-white text-xs' },
    { label: 'tan', onClick: () => handleScientific('tan'), className: 'bg-gray-600 hover:bg-gray-500 text-white text-xs' },
    { label: '√', onClick: () => handleScientific('sqrt'), className: 'bg-gray-600 hover:bg-gray-500 text-white' },
    
    { label: 'ln', onClick: () => handleScientific('ln'), className: 'bg-gray-600 hover:bg-gray-500 text-white text-xs' },
    { label: 'log', onClick: () => handleScientific('log'), className: 'bg-gray-600 hover:bg-gray-500 text-white text-xs' },
    { label: 'x²', onClick: () => handleScientific('square'), className: 'bg-gray-600 hover:bg-gray-500 text-white text-xs' },
    { label: 'x³', onClick: () => handleScientific('cube'), className: 'bg-gray-600 hover:bg-gray-500 text-white text-xs' },
    
    { label: '1/x', onClick: () => handleScientific('inverse'), className: 'bg-gray-600 hover:bg-gray-500 text-white text-xs' },
    { label: 'π', onClick: () => handleScientific('pi'), className: 'bg-gray-600 hover:bg-gray-500 text-white' },
    { label: 'e', onClick: () => handleScientific('e'), className: 'bg-gray-600 hover:bg-gray-500 text-white' },
    { label: '±', onClick: toggleSign, className: 'bg-gray-600 hover:bg-gray-500 text-white' },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      {/* Calculator - Takes 2 columns */}
      <div className="lg:col-span-2">
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl shadow-lg p-6 border border-gray-700">
          {/* Header with Mode Toggle */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-white text-base font-semibold">Calculator</h2>
            <button
              onClick={() => setIsScientific(!isScientific)}
              className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded-lg transition-colors"
              aria-label={isScientific ? 'Switch to basic mode' : 'Switch to scientific mode'}
            >
              {isScientific ? 'Basic' : 'Scientific'}
            </button>
          </div>

          {/* Display - Single Line */}
      <div className="mb-4">
            <div className="bg-black/40 rounded-lg p-6 border border-gray-700/50">
        <input
          type="text"
          value={display}
          readOnly
                className="w-full text-right text-4xl font-light text-white bg-transparent border-none focus:outline-none break-all"
                aria-label="Calculator display"
        />
      </div>
          </div>

          {/* Scientific Buttons */}
          {isScientific && (
            <div className="grid grid-cols-4 gap-2 mb-3">
              {scientificButtons.map((btn, idx) => (
                <button
                  key={idx}
                  onClick={btn.onClick}
                  className={`py-3 rounded-lg transition-colors font-medium ${btn.className}`}
                  aria-label={btn.label}
                >
                  {btn.label}
                </button>
              ))}
            </div>
          )}

          {/* Basic Buttons */}
          <div className="grid grid-cols-4 gap-2">
            {basicButtons.map((btn, idx) => (
          <button
            key={idx}
            onClick={btn.onClick}
                className={`py-5 rounded-lg transition-colors font-light text-2xl ${btn.className}`}
                aria-label={btn.label}
          >
            {btn.label}
          </button>
        ))}

            {/* Bottom Row */}
        <button
              onClick={() => inputNumber('0')}
              className="col-span-2 bg-gray-700 hover:bg-gray-600 text-white font-light py-5 rounded-lg text-2xl transition-colors"
              aria-label="0"
        >
          0
        </button>
        <button
              onClick={inputDecimal}
              className="bg-gray-700 hover:bg-gray-600 text-white font-light py-5 rounded-lg text-2xl transition-colors"
              aria-label="Decimal point"
        >
          .
        </button>
        <button
              onClick={performCalculation}
              className="bg-orange-500 hover:bg-orange-600 text-white font-medium py-5 rounded-lg text-2xl transition-colors"
              aria-label="Equals"
        >
          =
        </button>
          </div>
      </div>

        {/* Usage Tips - Below Calculator */}
        <div className="mt-4 text-xs text-gray-600 space-y-2 bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex items-center gap-2">
            <span className="text-blue-600">💡</span>
            <span>Negative numbers: Start with <kbd className="px-1.5 py-0.5 bg-gray-100 border border-gray-300 rounded text-gray-700 font-mono text-xs">−</kbd> or use <kbd className="px-1.5 py-0.5 bg-gray-100 border border-gray-300 rounded text-gray-700 font-mono text-xs">±</kbd> button</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-blue-600">⌨️</span>
            <span>Keyboard: <kbd className="px-1.5 py-0.5 bg-gray-100 border border-gray-300 rounded text-gray-700 font-mono text-xs">Enter</kbd> = Calculate, <kbd className="px-1.5 py-0.5 bg-gray-100 border border-gray-300 rounded text-gray-700 font-mono text-xs">Esc</kbd> = Clear, <kbd className="px-1.5 py-0.5 bg-gray-100 border border-gray-300 rounded text-gray-700 font-mono text-xs">Backspace</kbd> = Delete</span>
          </div>
        </div>
      </div>

      {/* History Panel */}
      <div className="lg:col-span-1">
        <div className="bg-white rounded-xl shadow-lg p-4 border border-gray-200 max-h-[600px] overflow-hidden flex flex-col">
          <div className="flex justify-between items-center mb-3 pb-3 border-b border-gray-200">
            <h3 className="text-base font-bold text-gray-900">History</h3>
            {history.length > 0 && (
              <button
                onClick={clearHistory}
                className="text-xs text-red-600 hover:text-red-700 font-medium px-2 py-1 hover:bg-red-50 rounded transition-colors"
                aria-label="Clear all history"
              >
                Clear All
              </button>
            )}
          </div>

          <div className="flex-1 overflow-y-auto space-y-3">
            {history.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-5xl mb-3">🧮</div>
                <p className="text-gray-500 text-sm">
                  No history yet
                </p>
              </div>
            ) : (
              history.map((item) => (
                <div
                  key={item.id}
                  className="group bg-gray-50 rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-sm transition-all overflow-hidden"
                >
                  {/* Calculation Display */}
                  <div 
                    className="p-3 cursor-pointer hover:bg-blue-50 transition-colors"
                    onClick={() => {
                      setDisplay(item.result);
                      setOperator(null);
                      setPreviousValue('');
                      setWaitingForOperand(true);
                    }}
                  >
                    <div className="text-xs text-gray-600 mb-1 break-all font-mono">
                      {item.expression}
                    </div>
                    <div className="text-xl font-bold text-gray-900 break-all">
                      = {item.result}
                    </div>
      </div>

                  {/* Note Display/Edit */}
                  {editingNoteId === item.id ? (
                    <div className="px-3 pb-3 bg-white border-t border-gray-200">
                      <textarea
                        value={tempNote}
                        onChange={(e) => setTempNote(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            saveNote(item.id);
                          } else if (e.key === 'Escape') {
                            cancelEditNote();
                          }
                        }}
                        placeholder="Add a note..."
                        rows={2}
                        className="w-full mt-2 px-3 py-2 text-sm border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                        autoFocus
                      />
                      <div className="flex gap-2 mt-2">
                        <button
                          onClick={() => saveNote(item.id)}
                          className="flex-1 px-3 py-1.5 text-xs font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          Save
                        </button>
                        <button
                          onClick={cancelEditNote}
                          className="flex-1 px-3 py-1.5 text-xs font-medium bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : item.note ? (
                    <div 
                      className="px-3 pb-3 bg-gradient-to-r from-blue-50 to-purple-50 border-t border-blue-100 cursor-pointer"
                      onClick={() => startEditNote(item.id, item.note)}
                    >
                      <p className="text-sm text-gray-700 mt-2 leading-relaxed">
                        {item.note}
                      </p>
                    </div>
                  ) : null}

                  {/* Action Buttons */}
                  <div className="flex border-t border-gray-200 bg-white">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        startEditNote(item.id, item.note);
                      }}
                      className="flex-1 py-2 text-xs text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors font-medium"
                      title="Add/Edit note"
                    >
                      {item.note ? 'Edit Note' : 'Add Note'}
                    </button>
                    <div className="w-px bg-gray-200"></div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteHistoryItem(item.id);
                      }}
                      className="flex-1 py-2 text-xs text-gray-600 hover:text-red-600 hover:bg-red-50 transition-colors font-medium"
                      title="Delete"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
